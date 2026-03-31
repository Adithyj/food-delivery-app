import "./SwiggyImage.css";
import swiggy from "../assets/swiggy-qr-image.png"
function SwiggyImage() {
    return (
        <div className="swiggy-image-container">
            <img
                src={swiggy}
                alt="Swiggy Offer"
                className="swiggy-image"
            />
        </div>
    );
}
 
export default SwiggyImage;