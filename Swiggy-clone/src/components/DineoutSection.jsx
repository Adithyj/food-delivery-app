import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./DineoutSection.css";
import restaurants from "./restaurantsData";

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
        {restaurants.map((res) => (
          <div 
            key={res.id}
            className="dineout-card"
            onClick={() => navigate(`/restaurant/${res.id}/dineout`)}
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