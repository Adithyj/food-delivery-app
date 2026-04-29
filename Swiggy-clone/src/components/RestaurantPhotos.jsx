import Navbar from "./Navbar";
import "./RestaurantPhotos.css";
import restaurants from "./restaurantsData";
import { useNavigate, useParams } from "react-router-dom";

function RestaurantPhotos() {
  const navigate = useNavigate();
  const { id } = useParams();

  
  const restaurant = restaurants.find(r => r.id === Number(id));

  
  if (!restaurant) {
    return <h2 style={{ padding: "20px" }}>Restaurant not found</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="photos-page">

        <h2>{restaurant.name}</h2>

        
        <div className="tabs">
          <span onClick={() => navigate(`/restaurant/${id}`)}>
            Home food delivery
          </span>
          <span onClick={() => navigate(`/restaurant/${id}/dineout`)}>
            Dineout
          </span>
          <span className="active">Photos</span>
          <span onClick={() => navigate(`/restaurant/${id}/menu`)}>
            Menu
          </span>
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

        
        <h3>Restaurant Photos</h3>

        <div className="photos-grid">
          {restaurant.photos && restaurant.photos.length > 0 ? (
            restaurant.photos.map((img, i) => (
              <img key={i} src={img} alt="restaurant" />
            ))
          ) : (
            <p>No photos available</p>
          )}
        </div>

      </div>
    </>
  );
}

export default RestaurantPhotos;