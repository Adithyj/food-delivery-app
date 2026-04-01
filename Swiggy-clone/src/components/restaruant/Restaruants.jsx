import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import "./RestaruantCards.css";
import { useNavigate } from "react-router-dom";


function Restaurants() {
  const API = import.meta.env.VITE_API ;
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [sort, setSort] = useState("");
  const [categories, setCategory] = useState([]);

  useEffect(() => {

    const fetchRestaurants = async () => {
      try {

        const res = await axios.get(
          `${API}/api/restaurants`,
          {
            params: {
              category: categoryName,
              sort: sort
            }
          }
        );

        setRestaurants(res.data);

      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurants();

  }, [categoryName, sort]);

  return (
    <div>

      <Navbar />

      <div className="page">

        <h1>{categoryName}</h1>

        <p>
          Satisfy your cravings for {categoryName} from the best restaurants near you.
        </p>

        <div className="filters">

          <button>Filter</button>

          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="rating">Rating</option>
            <option value="delivery">Fast Delivery</option>
          </select>

        </div>

        <h2>Restaurants to explore</h2>

        <div className="restaurant-grid">

          {restaurants.length === 0 ? (
            <p>No restaurants found.</p>
          ) : (

            restaurants.map((r) => (

              <div className="card" key={r._id} onClick={() => navigate(`/restaurant/${r._id}`)}>

                <img
                  src={`${API}/${r.image}`}
                  alt={r.name}
                />

                <div className="card-info">

                  <h3>{r.name}</h3>

                  <p className="rating">
                    ⭐ {r.rating} • {r.deliveryTime}
                  </p>
                 <div className="categories">
  <p style={{
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    color: "#686b78", 
    fontSize: "14px"
  }}> 
    {r.categories.map(cat => cat.name).join(", ")}
  </p>
</div>

                  <p className="location">{r.location}</p>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Restaurants;