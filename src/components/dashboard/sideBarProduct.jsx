import React, { useState, useEffect } from "react";
import "./productSidebar.css";

const ProductSidebar = ({ initialData = null, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    quantity: initialData?.quantity || "",
    image: initialData?.image || null,
  });

  useEffect(() => {
    setFormData({
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      quantity: initialData?.quantity || "",
      image: initialData?.image || null,
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
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

 const handleSubmit = () => {
   // Validate required fields
   if (
     !formData.name ||
     !formData.description ||
     !formData.price ||
     !formData.quantity
   ) {
     alert("Please fill out all fields.");
     return;
   }

   const dataToSubmit = new FormData();
   dataToSubmit.append("name", formData.name);
   dataToSubmit.append("description", formData.description);
   dataToSubmit.append("price", formData.price);
   dataToSubmit.append("quantity", formData.quantity);
   // If a new image is selected, add it to the FormData
   if (formData.image) {
     dataToSubmit.append("image", formData.image);
   } else if (initialData && initialData.image) {
     // If no new image is selected, but an existing image is available, keep the old image.
     dataToSubmit.append("image", initialData.image);
   }
   //show the data in the console
   dataToSubmit.forEach((value, key) => {
     console.log(`${key}: ${value}`);
   });
   onSave(dataToSubmit);
   onClose();
 };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>{initialData ? "Edit Product" : "Add Product"}</h2>
        <button onClick={onClose} className="close-btn">
          X
        </button>
      </div>
      <form className="sidebar-form" encType="multipart/form-data">
        {formData.image && (
          <img
            src={
              typeof formData.image === "string"
                ? `http://localhost:8000/storage/${formData.image}`
                : URL.createObjectURL(formData.image)
            }
            alt="Uploaded"
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
            required
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            required
            onChange={handleChange}
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
          />
        </label>
        <div className="file-upload">
          <input
            type="file"
            name="image"
            id="file"
            onChange={handleFileChange}
            className="file-input"
          />
          <label htmlFor="file" className="file-label">
            Choose an image
          </label>
        </div>
        <button type="button" onClick={handleSubmit}>
          {initialData ? "Update Product" : "Add Product"}
        </button>
        <button type="button" className="close" onClick={onClose}>
          close
        </button>
      </form>
    </div>
  );
};

export default ProductSidebar;
