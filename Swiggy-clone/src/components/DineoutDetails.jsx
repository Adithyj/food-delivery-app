import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./DineoutDetails.css";
import restaurants from "./restaurantsData";

function DineoutDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  
  const restaurant = restaurants.find(r => r.id === Number(id));

 
  if (!restaurant) {
    return <h2 style={{ padding: "20px" }}>Restaurant not found</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="dineout-wrapper">

        <div className="dineout-left">

          
          <h1 className="title">{restaurant.name}</h1>

          
          <div className="tabs">
            <span onClick={() => navigate(`/restaurant/${id}`)}>Home food delivery</span>
            <span className="active">Dineout</span>
            <span onClick={() => navigate(`/restaurant/${id}/photos`)}>Photos</span>
            <span onClick={() => navigate(`/restaurant/${id}/menu`)}>Menu</span>
          </div>

          
          <div className="hero1">
            <img src={restaurant.image} alt={restaurant.name} />

            <div className="hero-card">
              <p>
                <b>⭐ {restaurant.rating} • {restaurant.price}</b>
              </p>
              <p>{restaurant.cuisine}</p>
              <p>{restaurant.location}</p>
              <p className="open">Open now • OPEN TILL 11PM</p>

              <div className="hero-buttons">
                <button>Book Table</button>
                <button>Call</button>
                <button>Direction</button>
              </div>
            </div>
          </div>

         
          <div className="offer1">
            <div className="offer-left">

              <div className="offers-header">
                <h2>Offers</h2>
                <div className="offer-arrows">
                  <button>←</button>
                  <button>→</button>
                </div>
              </div>

              <div className="offers">
                <div className="offer-card">
                  <h3>{restaurant.offer}</h3>
                  <p>on total bill</p>
                  <span>@₹25/guest</span>
                </div>

                <div className="offer-card">
                  <h3>Flat 10% Off</h3>
                  <p>on total bill</p>
                  <span>@₹25/guest</span>
                </div>

                <div className="offer-card">
                  <h3>Flat 5% Off</h3>
                  <p>on total bill</p>
                </div>
              </div>

              <h3 className="sub-title">Additional Offers</h3>

              <div className="additional">
                <div className="add-card">Flat 10% Cashback</div>
                <div className="add-card">Flat 5% Cashback</div>
                <div className="add-card">10% Use DINE</div>
              </div>

            </div>

            
            <div className="offer-right">
              <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/c/newqrcodeswiggyLatest.png" />
            </div>
          </div>

          
          <div className="Food-Photo">
            <h2>Food Photos</h2>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {restaurant.photos.slice(0, 3).map((img, i) => (
                <img key={i} src={img} style={{ width: "120px", borderRadius: "8px" }} />
              ))}
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default DineoutDetails;