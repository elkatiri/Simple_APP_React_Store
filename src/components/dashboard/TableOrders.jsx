import React from "react";
import "./TableOrders.css";

const TableOrders = ({ orders, onStatusChange }) => {
  const handleStatusChange = (orderId, newStatus) => {
    if (onStatusChange) {
      onStatusChange(orderId, newStatus);
    }
  };

  return (
    <div>
      {orders ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Customers</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.products.map((product) => (
                  <tr key={`${order.id}-${product.id}`}>
                    <td>{order.id}</td>
                    <td>{product.name}</td>
                    <td>
                      <img
                        src={`http://localhost:8000/storage/${product.image}`}
                        alt={product.name}
                      />
                    </td>
                    <td>{product.price} €</td>
                    <td>{product.pivot.quantity}</td>
                    <td>
                      {(product.pivot.quantity * product.price).toFixed(2)} €
                    </td>
                    <td>{order.customer?.name || "N/A"}</td>
                    <td>
                      <select
                        value={order.delivery_status}
                        style={{
                          backgroundColor:
                            order.delivery_status === "pending"
                              ? "red"
                              : order.delivery_status === "shipped"
                              ? "yellow"
                              : "green",
                        }}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TableOrders;
