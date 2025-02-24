import { useEffect, useState } from "react";
import Footer from "./footer";
import ProductsList from "./listeproducts";
import Navbar from "./navbar";
import "./style/shope.css";
import axios from "axios";
import Creatable from "react-select/creatable";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import Spinner from "./spinner";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "./cartSlice";
import { Link } from "react-router-dom";
import GR_shop from "../images/GR_shop.png";
export default function Shop() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [selectedOption, setSelectedOption] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredProducts = async (filterType) => {
    setLoading(true);
    try {
      const url =
        filterType === "price"
          ? "http://127.0.0.1:8000/api/filterByPrice"
          : "http://127.0.0.1:8000/api/filterByTime";

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error filtering products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (newValue) => {
    setSelectedOption(newValue);
  };

  useEffect(() => {
    if (selectedOption?.value) {
      fetchFilteredProducts(selectedOption.value);
    } else {
      fetchProducts();
    }
  }, [selectedOption]);

  function Search(searchQuery) {
    if (searchQuery === "") {
      fetchProducts();
    } else {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }

  function handelAddToCart(product) {
    dispatch(addToCart({...product,quantity:1}));
  }

  function handelRemoveFromCart(index) {
    dispatch(removeFromCart(index));
  }

  return (
    <>
      <Navbar
        Search={Search}
        cart={cart}
        removeFromCart={handelRemoveFromCart}
      />
      <div className="shope_bg">
        <div className="center_shope">
          <img src={GR_shop} alt="shop Background" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <span>
              <ChevronRight />
            </span>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="filter">
        <h2>
          <SlidersHorizontal size={25} strokeWidth={3} className="icon" />
          Filter:
        </h2>
        <Creatable
          id="custom-select"
          isClearable
          value={selectedOption}
          onChange={handleChange}
          options={[
            { label: "Price", value: "price" },
            { label: "New", value: "new" },
          ]}
        />
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <ProductsList products={products} handelAddToCart={handelAddToCart} />
      )}
      <Footer />
    </>
  );
}
