import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./DineoutDetails.css";

function DineoutDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <Navbar />

      <div className="dineout-wrapper">

        
        <div className="dineout-left">

          <h1 className="title">Five Star</h1>

          <div className="tabs">
            <span onClick={() => navigate(`/restaurant/${id}`)}>Home food delivery</span>
            <span className="active">Dineout</span>
            <span onClick={() => navigate(`/restaurant/${id}/photos`)}>Photos</span>
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
              <h3>Flat 15% Off</h3>
              <p>on total bill</p>
              <span>@₹25/guest</span>
            </div>

            <div className="offer-card">
              <h3>Flat 10% Off</h3>
              <p>on total bill</p>
              <span>@₹25/guest</span>
            </div>

            <div className="offer-card">
              <h3>Flat 10% Off</h3>
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

         <div className="Food-Photo">
          <h2>Food Photos</h2>
          
         </div>

        
          
          
           <div className="offer-right">
            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/c/newqrcodeswiggyLatest.png" />
          </div>
          </div>
         
           

        </div>

        
       

      </div>
    </>
  );
}

export default DineoutDetails;