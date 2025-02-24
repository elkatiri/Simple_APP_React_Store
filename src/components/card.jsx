import React from "react";
import "./style/card.css";
import { ChevronRight, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import BfrFooter from "./bfr_footer";
import GR_card from "../images/GR_card.png";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./cartSlice";

const Cart = () => {
  const navigate=useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="card_bg">
        <div className="center_card">
          <img src={GR_card} alt="Cart Background" />
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
              <Link to="/check-out">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="cart-container">
        <div>
          <table className="cart-table">
            <thead>
              <tr className="cart-header">
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="cart-item">
                  <td className="cart-product">
                    <img
                      src={`http://localhost:8000/storage/${item.image}`}
                      alt={item.name}
                      className="product-image"
                    />
                    <span className="product-name">{item.name}</span>
                  </td>
                  <td>{item.price.toLocaleString()} Dh</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toLocaleString()} Dh</td>
                  <td>
                    <button
                      className="remove-item"
                      onClick={() =>dispatch(removeFromCart(item.id))}
                    >
                      <Trash color="#B88E2F" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-totals">
          <h2>Cart Totals</h2>
          <div className="totals-content">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{total.toLocaleString()} Dh</span>
            </div>
            <div className="total-row">
              <span>Total</span>
              <span className="highlight">{total.toLocaleString()} Dh</span>
            </div>
            <button className="checkout-button"onClick={()=>navigate('/check-out')}>Check Out</button>
          </div>
        </div>
      </div>
      <BfrFooter />
      <Footer />
    </>
  );
};

export default Cart;
