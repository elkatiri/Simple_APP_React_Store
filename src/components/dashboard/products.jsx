import { useEffect, useState } from "react";
import image1 from "../../images/admin.png";
import TableProducts from "./tableProducts";
import axios from "axios";
import "./products.css";
import ProductSidebar from "./sideBarProduct";
import SideBar from "./sideBar";

export default function Products({ userName }) {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState(null);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      if (!token) {
        throw new Error("Token not available");
      }
      const response = await axios.get("http://127.0.0.1:8000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      setError("Error fetching products: " + token);
    }
  };

  // Initialize token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("Token not found in localStorage");
    }
  }, []);

  // Fetch products only when token is available
  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  // Handle delete of a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts(); // Refresh products
    } catch (error) {
      setError("Error deleting product: " + error.message);
    }
  };

  // Open sidebar to update a product
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

  // Open sidebar to add a new product
  const handleAddProduct = () => {
    setCurrentProduct(null); // Clear the form for a new product
    setIsSidebarOpen(true);
  };

  // Handle saving a product (both adding and updating)
  const handleSaveProduct = async (productData) => {
    //debuging the product data

    try {
      if (!token) {
        throw new Error("Token not available");
      }

      // If currentProduct is set, we are updating a product
      if (currentProduct) {
        //Debeguing
        productData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });

        const response = await axios.put(
          `http://127.0.0.1:8000/api/products/${currentProduct.id}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.data) {
          throw new Error("Failed to update product");
        }
      } else {
        // Otherwise, we are adding a new product
        //debuging:
        productData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
        });
        const response = await axios.post(
          "http://127.0.0.1:8000/api/products",
          productData,
          {
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json",
          }
        );
        if (!response.data) {
          throw new Error("Failed to add product");
        }
      }

      // Reload products after save and close the sidebar
      fetchProducts();
      setIsSidebarOpen(false);
    } catch (error) {
      setError("Error saving product: " + error.message);
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
          <TableProducts
            products={products}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
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
