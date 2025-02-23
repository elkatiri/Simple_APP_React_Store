import { useEffect, useState } from "react";
import image1 from "../../images/admin.png";
import TableProducts from "./tableProducts";
import axios from "axios";
import "./products.css";
import ProductSidebar from "./sideBarProduct";
import SideBar from "./sideBar";
import Spinner from "../spinner";

export default function Products({ userName }) {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true); // Start loading
    try {
      if (!token) {
        throw new Error("Token not available");
      }
      const response = await axios.get("http://127.0.0.1:8000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      setError("Error fetching products: " + error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("Token not found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (error) {
      setError("Error deleting product: " + error.message);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCurrentProduct(response.data);
      setIsSidebarOpen(true);
    } catch (error) {
      setError("Error fetching product: " + error.message);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsSidebarOpen(true);
  };

  const handleSaveProduct = async (productData) => {
    setLoading(true); // Start loading
    try {
      if (!token) {
        throw new Error("Token not available");
      }

      // Important: Do not convert FormData to JSON
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      };

      let response;
      if (currentProduct) {
        // For update, use POST method with _method: PUT for Laravel
        productData.append("_method", "PUT");
        response = await axios.post(
          `http://127.0.0.1:8000/api/products/${currentProduct.id}`,
          productData,
          config
        );
      } else {
        response = await axios.post(
          "http://127.0.0.1:8000/api/products",
          productData,
          config
        );
      }

      if (!response.data) {
        throw new Error("Failed to save product");
      }

      fetchProducts();
      setIsSidebarOpen(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Full error:", error);
      setError(
        "Error saving product: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <SideBar />
      <div className="productContainer">
        <div>
          <div className="welcome">
            <h1>
              Welcome <span>{userName}</span>👋
            </h1>
            <img src={image1} alt="admin" />
          </div>
          <div className="productList">
            <h1>Products ({products.length})</h1>
            <button className="addProduct" onClick={handleAddProduct}>
              + Add Product
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {loading ? ( // Show spinner while loading
            <Spinner />
          ) : (
            <TableProducts
              products={products}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
          {isSidebarOpen && (
            <ProductSidebar
              onClose={() => setIsSidebarOpen(false)}
              initialData={currentProduct}
              onSave={handleSaveProduct}
            />
          )}
        </div>
      </div>
    </>
  );
}
