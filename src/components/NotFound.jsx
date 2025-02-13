import { Link } from "react-router-dom";
import "./style/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button className="not-found-button"><Link to="/home">Go back to Home</Link></button>
    </div>
  );
};

export default NotFound;
