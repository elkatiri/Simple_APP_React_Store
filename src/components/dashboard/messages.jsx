import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./sideBar";
import "./messages.css";
import Spinner from "../spinner";
import { Clock, Trash2 } from 'lucide-react';
import image1 from "../../images/admin.png"

function Messages({ userName }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages from API
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/messages");
        setMessages(response.data);
        
        // Store all message IDs as read
        const messageIds = response.data.map(msg => msg.id);
        localStorage.setItem('readMessageIds', JSON.stringify(messageIds));
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/messages/${id}`);
      setMessages(messages.filter((msg) => msg.id !== id)); // Remove deleted message from the state
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <SideBar />
      <div className="messages-container">
        <div className="welcome">
          <h1>
            Welcome <span>{userName}👋</span>
          </h1>
          <img src={image1} alt="admin" />
        </div>
        <h2>📩 Messages</h2>

        {loading ? (
          <p className="loading-message">
            <Spinner />
          </p>
        ) : messages.length === 0 ? (
          <p className="no-messages">No messages found.</p>
        ) : (
          <div className="messages-grid">
            {messages.map((msg) => (
              <div key={msg.id} className="message-card">
                <div className="message-header">
                  <div className="avatar">{getInitials(msg.name)}</div>
                  <div className="message-info">
                    <h3 className="message-name">{msg.name}</h3>
                    <p className="message-email">{msg.email}</p>
                  </div>
                  <div
                    className="delete-icon"
                    onClick={() => deleteMessage(msg.id)}
                  >
                    <Trash2 size={18} color="#FF4C4C" />
                  </div>
                </div>
                <p className="message-content">{msg.message}</p>
                <div className="message-date">
                  <Clock size={14} />
                  {new Date(msg.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default Messages;
