import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./tableProducts.css";

const TableProducts = ({ products, onUpdate, onDelete }) => {
  return (
    <div className="table-container">
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description || "N/A"}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.image ? (
                    <img
                      src={`http://localhost:8000/storage/${product.image}`}
                      alt={product.image}
                      className="product-image"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td className="actions">
                  <FaEdit
                    className="action-icon edit-icon"
                    onClick={() => onUpdate(product.id)}
                  />
                  <FaTrash
                    className="action-icon delete-icon"
                    onClick={() => onDelete(product.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableProducts;
