import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./style/Checkout.css";
import Navbar from "./navbar";
import Footer from "./footer";
import BfrFooter from "./bfr_footer";
import GR_checkout from "../images/GR_chechout.png";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./spinner";
import OrderSuccess from "./ordersuccess";
import { clearCart } from "./cartSlice";

function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert(
        "Your cart is empty. Please add items to the cart before proceeding."
      );
      return;
    }
    if (
      !billingDetails.firstName ||
      !billingDetails.lastName ||
      !billingDetails.email ||
      !billingDetails.phone
    ) {
      alert(
        "Please fill in all required fields: First Name, Last Name, Email, and Phone."
      );
      return;
    }

    setLoading(true);

    try {
      // Concatenate first and last name into a single "name" field
      const fullName = `${billingDetails.firstName} ${billingDetails.lastName}`;

      // Create customer with full name, email, and phone
      const customerResponse = await axios.post(
        "http://localhost:8000/api/customers",
        {
          name: fullName, // Send concatenated name
          email: billingDetails.email,
          phone: billingDetails.phone,
        }
      );

      if (!customerResponse.data.id)
        throw new Error("Customer creation failed");

      const customerId = customerResponse.data.id;

      // Place the order for the newly created customer
      const orderResponse = await axios.post(
        "http://localhost:8000/api/orders",
        {
          customer_id: customerId,
          order_date: new Date().toISOString().split("T")[0],
          delivery_status: "pending",
          products: cartItems.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }
      );

      if (!orderResponse.data) throw new Error("Order placement failed");

      dispatch(clearCart());
      setOrderPlaced(true);
      setTimeout(() => {
        setOrderPlaced(false);
      }, 5000);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="checkout_bg">
        <div className="center_checkout">
          <img src={GR_checkout} alt={GR_checkout} />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <span>
              <ChevronRight />
            </span>
            <li>
              <Link to="/check-out">Checkout</Link>
            </li>
          </ul>
        </nav>
      </div>
      {loading && <Spinner />}
      {orderPlaced && <OrderSuccess />}
      <div className="checkOut_container">
        <div className="billing-details">
          <h1>Billing Details:</h1>
          <div className="name-section">
            <div className="first">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={billingDetails.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="last">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={billingDetails.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="email-section">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={billingDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="phone-section">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={billingDetails.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="payement-info-section">
          <div className="product-section">
            <div className="row">
              <div className="column">
                <h2>Product</h2>
                <h2>Subtotal</h2>
              </div>
            </div>
            {cartItems.map((item) => (
              <div key={item.id} className="row">
                <div className="column">
                  <label>
                    {item.name} x {item.quantity}
                  </label>
                  <span>
                    {(item.price * item.quantity).toLocaleString()} Dh
                  </span>
                </div>
              </div>
            ))}
            <div className="row">
              <div className="column">
                <label>Subtotal</label>
                <span>{total.toLocaleString()} Dh</span>
              </div>
            </div>
            <div className="row">
              <div className="column">
                <label>Total</label>
                <span>{total.toLocaleString()} Dh</span>
              </div>
            </div>
          </div>

          <div className="payment-section">
            {selectedPayment && (
              <div className="selected-payment">
                <input type="radio" checked readOnly />
                <span>{selectedPayment}</span>
              </div>
            )}
            <p>
              Make your payment directly into our bank account or pay cash on
              delivery.
            </p>
            <label>
              <input
                type="radio"
                name="payment"
                onChange={() => handlePaymentChange("Direct Bank Transfer")}
                checked={selectedPayment === "Direct Bank Transfer"}
              />
              Direct Bank Transfer
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                onChange={() => handlePaymentChange("Cash on Delivery")}
                checked={selectedPayment === "Cash on Delivery"}
              />
              Cash on Delivery
            </label>
            <p className="privacy-notice">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our
              <span> privacy policy. </span>
            </p>
            <button
              className="place-order-button"
              onClick={placeOrder}
              disabled={loading || !selectedPayment}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <BfrFooter />
      <Footer />
    </div>
  );
}
export default Checkout;
