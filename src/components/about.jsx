import { useState } from "react";
import axios from "axios";
import "./style/about.css";
import location from "../images/location.png";
import phone from "../images/phone.png";
import time from "../images/time.png";
import BfrFooter from "./bfr_footer";
import Footer from "./footer";
import Navbar from "./navbar";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import GR_contact from "../images/GR_contact.png"

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/messages",
        formData
      );
      setResponseMessage("Message sent successfully!");

      setTimeout(() => {
        setResponseMessage("");
      }, 2000);

      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      setResponseMessage("Error sending message. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container_about">
      <Navbar />
      <div className="contact_bg">
        <div className="center_contact">
          <img src={GR_contact} alt="contact Background" />
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
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="special_header">
        <h1>Get In Touch With Us</h1>
        <p>
          For More Information About Our Product & Services, please feel free to
          drop us an email. Our staff will always be there to help you out.
        </p>
      </div>
      <div className="all_contact">
        <div className="details_about">
          <div className="all">
            <img src={location} alt="Location" />
            <div>
              <p>Address</p>
              <span>236 5th SE Avenue, New York NY10000, United States</span>
            </div>
          </div>
          <div className="all">
            <img src={phone} alt="Phone" />
            <div>
              <p>Phone</p>
              <span>
                Mobile: +(84) 546-6789
                <br />
                Hotline: +(84) 456-6789
              </span>
            </div>
          </div>
          <div className="all">
            <img src={time} alt="Working Hours" />
            <div>
              <p>Working-Time</p>
              <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows={10}
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn">
            Submit
          </button>

          {responseMessage && <p className="response">{responseMessage}</p>}
        </form>
      </div>

      <BfrFooter />
      <Footer />
    </div>
  );
}
