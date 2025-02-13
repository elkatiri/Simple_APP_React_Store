// OrderSuccess.js
import React from "react";
import { CheckCircle } from "lucide-react";
import "./style/OrderSuccess.css"; // Create this CSS file for custom styling

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <CheckCircle size={100} color="green" />
      <span className="order-success-message">Order Placed Successfully!</span>
    </div>
  );
};

export default OrderSuccess;
