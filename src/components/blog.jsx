import "./style/blog.css"
import blog1 from "../images/blog1.png";
import blog2 from "../images/blog2.png";
import blog3 from "../images/blog3.png";
import blog4 from "../images/blog4.png";
import blog5 from "../images/blog5.png";
import blog6 from "../images/blog6.png";
import blog7 from "../images/blog7.png";
import BfrFooter from "./bfr_footer";
import Navbar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";

export default function Blog() {
  return (
    <div className="blog">
      <Navbar />
      <div className="bg_blog"></div>
      <div className="body_blog">
        <div className="images_blog">
          <img src={blog1} alt="image1"></img>
          <img src={blog4} alt="image1"></img>
          <img src={blog7} alt="image1"></img>
          <img src={blog2} alt="image1"></img>
          <img src={blog3} alt="image1"></img>
          <img src={blog6} alt="image1"></img>
          <img src={blog5} alt="image1"></img>
          <img src={blog2} alt="image1"></img>
          <img src={blog4} alt="image1"></img>
        </div>
        <div className="blog_content">
          <h1 className="blog-title">Furniro</h1>
          <p className="content">
            Welcome to <span>Furniro</span>, where style meets quality in every
            piece of furniture we create. At <span>Furniro</span> , we believe
            that furniture is more than just functional it’s an essential part
            of what makes a house feel like home. That’s why we are dedicated to
            offering a diverse range of thoughtfully designed, high-quality
            furniture that combines comfort, durability, and timeless appeal.
          </p>
          <button className="shopNow">
            <Link to="/shop">Shop now</Link>
          </button>
          <hr></hr>
          <div className="details">
            <p>have any more questions? contact us here!</p>
            <span>+212651625941</span>
          </div>
        </div>
      </div>
      <BfrFooter />
      <Footer />
    </div>
  );
}