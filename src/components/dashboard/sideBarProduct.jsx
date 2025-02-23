import React, { useState, useEffect } from "react";
import "./productSidebar.css";

const ProductSidebar = ({ initialData = null, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    quantity: initialData?.quantity || "",
    image: null,
    imagePreview: initialData?.image ? `http://localhost:8000/storage/${initialData.image}` : null
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      quantity: initialData?.quantity || "",
      image: null,
      imagePreview: initialData?.image ? `http://localhost:8000/storage/${initialData.image}` : null
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.description || !formData.price || !formData.quantity) {
      alert("Please fill out all required fields.");
      return;
    }

    const dataToSubmit = new FormData();
    dataToSubmit.append("name", formData.name);
    dataToSubmit.append("description", formData.description);
    dataToSubmit.append("price", formData.price);
    dataToSubmit.append("quantity", formData.quantity);

    // Handle image upload
    if (formData.image) {
      dataToSubmit.append("image", formData.image);
    } else if (initialData?.image) {
      // If updating and no new image selected, send the existing image path
      dataToSubmit.append("current_image", initialData.image);
    }

    // For debugging
    console.log("Form Data Contents:");
    for (let pair of dataToSubmit.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    onSave(dataToSubmit);
    onClose();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>{initialData ? "Edit Product" : "Add Product"}</h2>
        <button type="button" onClick={onClose} className="close-btn">
          X
        </button>
      </div>
      <form className="sidebar-form" onSubmit={handleSubmit} encType="multipart/form-data">
        {formData.imagePreview && (
          <img
            src={formData.imagePreview}
            alt="Product preview"
            className="styled-image"
          />
        )}

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
          />
        </label>
        <div className="file-upload">
          <input
            type="file"
            name="image"
            id="file"
            onChange={handleFileChange}
            className="file-input"
            accept="image/*"
          />
          <label htmlFor="file" className="file-label">
            {formData.image ? 'Change image' : 'Choose an image'}
          </label>
        </div>
        <button type="submit">
          {initialData ? "Update Product" : "Add Product"}
        </button>
        <button type="button" className="close" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export default ProductSidebar;