import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./DineoutSection.css";

const restaurants = Array(10).fill({
  name: "Five Star",
  rating: "4.6",
  cuisine: "Fast Food • Beverages",
  location: "Diya Enclave Complex, Lalbagh",
  price: "₹400 for two",
  distance: "10.8 km",
  offer: "Flat 30% off on pre-booking",
  image:
    "https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2025/12/1/1fa8c6e5-d424-403f-a6c7-67e607b2e4f7_image1174a2af93d7b94b41a4d017d30bf7cf8c.JPG",
});

function DineoutSection() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="dineout-section">

      <div className="dineout-header">
        <h2>Discover best restaurants on Dineout</h2>

        <div className="arrow-buttons">
          <button onClick={scrollLeft}>←</button>
          <button onClick={scrollRight}>→</button>
        </div>
      </div>

      <div className="dineout-container" ref={scrollRef}>
        {restaurants.map((res, index) => (
          <div 
            key={index} 
            className="dineout-card"
            onClick={() => navigate(`/restaurant/${index}/dineout`)}
          >

            <div className="card-image">
              <img src={res.image} alt={res.name} />

              <span className="gif-label">GIF SPECIAL</span>

              <div className="image-overlay">
                <span className="res-name">{res.name}</span>
                <span className="rating">★ {res.rating}</span>
              </div>
            </div>

            <div className="card-body">

              <div className="cuisine-row">
                <span>{res.cuisine}</span>
                <span>{res.price}</span>
              </div>

              <div className="location-row">
                <span>{res.location}</span>
                <span>{res.distance}</span>
              </div>

              <div className="offer">{res.offer}</div>

              <div className="bank-offer">
                Up to 10% off with bank offers
              </div>

              <div className="extra-offer">
                Get extra 10% off using DINE150
              </div>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

export default DineoutSection;