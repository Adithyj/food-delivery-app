import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ItemSection.css";

function ItemsSection() {
  const [categories, setCategories] = useState([]);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API}/api/categories`);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -450, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 450, behavior: "smooth" });
  };

  
  const firstRow = categories.slice(0, Math.ceil(categories.length / 2));
  const secondRow = categories.slice(Math.ceil(categories.length / 2));

  return (
    <div className="items-section">
      <div className="items-header">
        <h2>What's on your mind?</h2>

        <div className="arrow-buttons">
          <button onClick={scrollLeft} className="arrow-btn">←</button>
          <button onClick={scrollRight} className="arrow-btn">→</button>
        </div>
      </div>

      <div className="scroll-wrapper" ref={scrollRef}>
        <div className="row">
          {firstRow.map((item) => (
            <div
              key={item._id}
              className="item-card"
              onClick={() => navigate(`/category/${item.name}`)}
            >
              <img
                src={`${API}/${item.image}`}
                alt={item.name}
              />
            
            </div>
          ))}
        </div>

        <div className="row">
          {secondRow.map((item) => (
            <div
              key={item._id}
              className="item-card"
              onClick={() => navigate(`/category/${item.name}`)}
            >
              <img
                src={`${API}/${item.image}`}
                alt={item.name}
              />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemsSection;