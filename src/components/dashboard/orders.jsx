import "./orders.css";
import image1 from "../../images/admin.png";
import vector2 from "../../images/Vector2.png";
import vector3 from "../../images/Vector3.png";
import vector4 from "../../images/Vector4.png";
import { useEffect, useState } from "react";
import axios from "axios";
import TableOrders from "./TableOrders";
import SideBar from "./sideBar";
import Spinner from "../spinner"; 

export default function Orders({ userName }) {
  const API_URL = "http://localhost:8000/api/orders";
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState([]);
  const [newOrders, setNewOrders] = useState([]);
  const [shippedCount, setShippedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(false); // New loading state

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true); // Start loading
    try {
      if (!token) {
        throw new Error("Token not available");
      }
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      setOrders(data);
      calculateStatusCounts(data);
      filterNewOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Calculate status counts
  const calculateStatusCounts = (orders) => {
    const counts = orders.reduce(
      (acc, order) => {
        if (order.delivery_status === "shipped") acc.shipped++;
        if (order.delivery_status === "pending") acc.pending++;
        return acc;
      },
      { shipped: 0, pending: 0 }
    );

    setShippedCount(counts.shipped);
    setPendingCount(counts.pending);
  };

  // Filter new orders (created within the last 24 hours)
  const filterNewOrders = (orders) => {
    const currentTime = new Date();
    const newOrdersList = orders.filter((order) => {
      const orderCreationTime = new Date(order.created_at);
      return currentTime - orderCreationTime <= 24 * 60 * 60 * 1000;
    });
    setNewOrders(newOrdersList);
  };

  // Handle status change for an order
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Update status in backend
      await axios.put(
        `${API_URL}/${orderId}`,
        { delivery_status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Re-fetch all orders from the backend
      await fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  // Initial fetch of orders
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    fetchOrders();
  }, [token]);

  return (
    <>
      <SideBar />
      <div className="containerDashbord">
        <div className="welcome">
          <h1>
            Welcome <span>{userName}👋</span>
          </h1>
          <img src={image1} alt="admin" />
        </div>
        <div className="generalInfo">
          <div className="info shipped">
            Shipped orders
            <span>{shippedCount}</span>
            <img src={vector2} alt="vector2" />
          </div>
          <div className="info Pending">
            Pending orders
            <span>{pendingCount}</span>
            <img src={vector3} alt="vector3" />
          </div>
          <div className="info newOrder">
            New Orders
            <span>{newOrders.length}</span>
            <img src={vector4} alt="vector4" />
          </div>
        </div>
        {loading ? ( // Show spinner while loading
          <Spinner />
        ) : (
          <TableOrders orders={orders} onStatusChange={handleStatusChange} />
        )}
      </div>
    </>
  );
}
