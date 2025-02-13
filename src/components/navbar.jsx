import React, { useState } from "react";
import { FaCartPlus, FaSearch, FaUser } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingBag, Trash } from "lucide-react";
import { removeFromCart } from "./cartSlice";
import { logout } from "./authSlice";
import "./style/navbar.css";
import logo from "../images/logo.png";

const Navbar = ({ Search }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartVisible, setIsCartVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userName = useSelector((state) => state.auth.userName);

  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);
  const toggleCart = () => setIsCartVisible(!isCartVisible);

  function handleSearch(e) {
    setSearchQuery(e.target.value);
    Search(e.target.value);
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Furniro Logo" />
        <h1>Furniro</h1>
      </div>
      <ul className="menu">
        <li>
          <NavLink to="/home" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <div className="icons">
        <div className="user-container">
          {userName ? (
            <span className="user-name">{userName}</span>
          ) : (
            <NavLink to="/auth">
              <FaUser className="icon" />
            </NavLink>
          )}
          {userName && (
            <button className="logout-btn" onClick={() => dispatch(logout())}>
              Logout
            </button>
          )}
        </div>
        <div className="search-container">
          <FaSearch className="icon" onClick={toggleSearch} />
          {isSearchVisible && (
            <input
              type="text"
              className="search-input"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearch}
            />
          )}
        </div>
        <div className="cart-icon-container" onClick={toggleCart}>
          <FaCartPlus className="icon" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
      </div>
      {isCartVisible && (
        <div className="shopping-cart">
          <div className="shopping-cart-header">
            <h1>Shopping Cart</h1>
            <ShoppingBag className="ShoppingBag" onClick={toggleCart} />
          </div>
          <div className="shopping-cart-container">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="shopping-cart-element">
                  <img
                    src={`http://localhost:8000/storage/${item.image}`}
                    alt={item.name}
                  />
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                  <p>{item.price * item.quantity} dh</p>
                  <button
                    className="remove-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <Trash color="#B88E2F" />
                  </button>
                </div>
              ))
            ) : (
              <p className="empty-cart">Your cart is empty.</p>
            )}
          </div>
          <div className="shopping-totale">
            <h1>Subtotal</h1>
            <p>
              {cart
                .reduce(
                  (acc, item) => acc + Number(item.price * item.quantity),
                  0
                )
                .toFixed(2)}{" "}
              dh
            </p>
          </div>
          <hr />
          <div className="shopping-buttons">
            <button onClick={() => navigate("/cart")}>Cart</button>
            <button onClick={() => navigate("/check-out")}>Check-out</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
