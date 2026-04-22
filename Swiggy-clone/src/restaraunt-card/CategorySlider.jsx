import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SwiggyNavbar from "./SwiggyNavbar";
import "./CategorySlider.css";
import Footer from "../components/Footer";
function CategorySlider() {
  const API = import.meta.env.VITE_API;
  const [categories, setCategories] = useState([]);

  const scrollRef = useRef();
  const restScrollRef = useRef(); 

  const [restaurant, setRestaurants] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get(`${API}/api/restaurants`);

        let data = res.data;

        
        if (sort === "rating") {
          data = data.sort((a, b) => b.rating - a.rating);
        }

        if (sort === "delivery") {
          data = data.sort(
            (a, b) =>
              parseInt(a.deliveryTime) - parseInt(b.deliveryTime)
          );
        }

        setRestaurants(data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurants();
  }, [sort]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${API}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  
  const restLeft = () => {
    restScrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const restRight = () => {
    restScrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  
  const restaurants = [
    {
      name: "Polar Bear",
      rating: 4.7,
      time: "25-30 mins",
      cuisine: "Ice Cream, Desserts",
      place: "Kodialbail",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/c5cb577d1fdab9aa00388b3189dd5b9a",
    },
    {
      name: "Baskin Robbins",
      rating: 4.5,
      time: "25-30 mins",
      cuisine: "Desserts, Ice Cream",
      place: "Hampankatta",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2026/3/26/34e8720b-661a-43be-85ad-e8cd35244e4e_809469.JPG",
    },
    {
      name: "Naturals Ice Cream",
      rating: 4.8,
      time: "25-30 mins",
      cuisine: "Ice Cream, Desserts",
      place: "Kadri",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/soymzzzl5a4k8pbusuno",
    },
    {
      name: "KFC",
      rating: 4.4,
      time: "30-35 mins",
      cuisine: "Burgers, Fast Food",
      place: "Kadri",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2025/1/17/dbe42f16-c6b1-4428-945c-96242af57a14_99531.JPG",
    },
    {
      name: "Subway",
      rating: 4.4,
      time: "35-40 mins",
      cuisine: "Sandwich, Healthy",
      place: "Hampankatta",
      image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/j2wfv2jca1p3rqifbxz0",
    },
  ];

  return (
    <div>
      <SwiggyNavbar />

      
      <div className="category-section">
        <div className="category-inner">

          <div className="header">
            <h2>Adithya, what's on your mind?</h2>
            <div className="arrows">
              <button onClick={scrollLeft}>←</button>
              <button onClick={scrollRight}>→</button>
            </div>
          </div>

          <div className="category-row" ref={scrollRef}>
            {categories.map((cat) => (
              <div className="category-card" key={cat._id}>
                <img src={`${API}/${cat.image}`} alt={cat.name} />
              </div>
            ))}
          </div>

        </div>
      </div>

     
      <div className="restaurant-section">
        <div className="category-inner">

          <div className="header">
            <h2>Top restaurant chains in Mangaluru</h2>
            <div className="arrows">
              <button onClick={restLeft}>←</button>
              <button onClick={restRight}>→</button>
            </div>
          </div>

          <div className="restaurant-row" ref={restScrollRef}>
            {restaurants.map((r, i) => (
              <div className="restaurant-card" key={i}>
                <img src={r.image} alt={r.name} />

                <div className="rest-info">
                  <h3>{r.name}</h3>
                  <p className="rating">⭐ {r.rating} • {r.time}</p>
                  <p className="cuisine">{r.cuisine}</p>
                  <p className="place">{r.place}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      <div className="all-restaurants-section">
  <div className="restaurant-inner">

    <h2>Restaurants with online food delivery in Mangaluru</h2>

    
    <div className="sort-bar">
      <select>
        <option>Sort By</option>
        <option>Rating</option>
        <option>Fast Delivery</option>
      </select>
    </div>

    
    <div className="restaurant-grid">

      {restaurant.map((r, i) => (
        <div className="grid-card" key={i}>

          <div className="image-wrapper">
            <img src={`${API}/${r.image}`} alt={r.name} />
            <div className="offer">20% OFF UPTO ₹50</div>
          </div>

          <div className="rest-info">
            <h3>{r.name}</h3>

            <div className="rating-row">
              <span className="rating-badge">★ {r.rating}</span>
              <span>{r.time}</span>
            </div>

            <p className="cuisine">{r.cuisine}</p>
            <p className="place">{r.place}</p>
          </div>

        </div>
      ))}

    </div>

  </div>
</div>
<Footer />
    </div>
  );
}

export default CategorySlider;