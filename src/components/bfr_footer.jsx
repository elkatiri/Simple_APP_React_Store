import one from '../images/trophy 1.png';
import two from '../images/guarantee.png';
import three from '../images/shipping.png';
import four from '../images/call.png';
import "./style/bfr_footer.css"
export default function BfrFooter(){
    return (
      <div className="BfrFooter_container">
        <div className="BfrFooter_all">
          <img src={one} alt=""></img>
          <div>
            <p>Heigh Quality</p>
            <span>crafted from top materials</span>
          </div>
        </div>
        <div className="BfrFooter_all">
          <img src={two} alt=""></img>
          <div>
            <p>Warranty Protection</p>
            <span>over two years</span>
          </div>
        </div>
        <div className="BfrFooter_all">
          <img src={three} alt=""></img>
          <div>
            <p>Free Shipping</p>
            <span>Order over 150 $</span>
          </div>
        </div>
        <div className="BfrFooter_all">
          <img src={four} alt=""></img>
          <div>
            <p>Dedicated support</p>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    );
}