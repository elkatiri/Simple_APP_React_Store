import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/Auth/AuthForm";
import Orders from "./components/dashboard/orders";
import Products from "./components/dashboard/products";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";
import Blog from "./components/blog";
import About from "./components/about";
import Home from "./components/home";
import Shop from "./components/shope";
import ProductDetails from "./components/productdetails";
import Checkout from "./components/Checkout";
import { Provider } from "react-redux";
import store from "./components/store";
import Cart from "./components/card";
import Messages from "./components/dashboard/messages";
function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUser] = useState("");
  useEffect(() => {
    setIsAdmin(localStorage.getItem("admin"));
    setUser(localStorage.getItem("userName"));
  }, []);
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/dashboard/orders"
              element={isAdmin && <Orders userName={userName} />}
            />
            <Route
              path="/dashboard/products"
              element={isAdmin && <Products userName={userName} />}
            />
            <Route
              path="/dashboard/messages"
              element={isAdmin && <Messages userName={userName} />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/about" element={<Blog />} />
            <Route path="/contact" element={<About />} />
            <Route path="/check-out" element={<Checkout />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};
export default App;
