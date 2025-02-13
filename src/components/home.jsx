import Header from "./header";
import ProductsList from "./listeproducts";
import Navbar from "./navbar";
import Footer from "./footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "./cartSlice";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchedProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/limitedProducts"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  function handelShowMore() {
    navigate("shop");
  }

  function Search(searchQuery) {
    if (searchQuery === "") {
      fetchedProducts();
    } else {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  }

  function handelAddToCart(product) {
    dispatch(addToCart({...product,quantity:1})); // Dispatch action to add to Redux store
  }

  function handelRemoveFromCart(index) {
    dispatch(removeFromCart(index)); // Dispatch action to remove from Redux store
  }

  useEffect(() => {
    fetchedProducts();
  }, []);

  return (
    <>
      <Navbar
        Search={Search}
        cart={cart}
        removeFromCart={handelRemoveFromCart}
      />
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <ProductsList
          products={products}
          handelShowMore={handelShowMore}
          handelAddToCart={handelAddToCart}
        />
      )}
      <Footer />
    </>
  );
}
