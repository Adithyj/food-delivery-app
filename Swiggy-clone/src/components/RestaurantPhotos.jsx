import Navbar from "./Navbar";
import "./RestaurantPhotos.css";
import { useNavigate, useParams } from "react-router-dom";
function RestaurantPhotos() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <Navbar />

      <div className="photos-page">

        <h2>Food</h2>
          <div className="tabs">
            <span onClick={() => navigate(`/restaurant/${r._id}`)}>Home food delivery</span>
            <span onClick={() => navigate(`/restaurant/${id}/dineout`)}>Dineout</span>
            <span className="active">Photos</span>
            <span onClick={() => navigate(`/restaurant/${id}/menu`)}>Menu</span>
          </div>
          <div className="hero1">
            <img src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2025/12/1/1fa8c6e5-d424-403f-a6c7-67e607b2e4f7_image1174a2af93d7b94b41a4d017d30bf7cf8c.JPG" />

            <div className="hero-card">
              <p><b>⭐ 4.6 • ₹400 for two</b></p>
              <p>Fast Food</p>
              <p>DIYA ENCLAVE BASEMENT</p>
              <p className="open">Open now • OPEN TILL 11PM</p>

              <div className="hero-buttons">
                <button>Book Table</button>
                <button>Call</button>
                <button>Direction</button>
              </div>
            </div>
          </div>
          <h3>Restaurant Photos</h3><br />
        <div className="photos-grid">
          
          <img src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2025/12/3/97db2b4b-1eb0-4ffb-bbce-b6335e972212_image10f9b4beb2c7b74307896fcda2f7db6da9.JPG" />
          <img src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2025/12/3/a2e1a65f-3816-4539-81a0-99326e27b8b8_image2406eb2b5ae424edfb203bf0ff30c98a7.JPG" />
          <img src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2025/12/3/7497c247-f928-45a0-b923-df5a42121028_image08d641edd25484b58bb08d45a0b5c5d6d.JPG" />
          
        </div>

        

      </div>
    </>
  );
}

export default RestaurantPhotos;