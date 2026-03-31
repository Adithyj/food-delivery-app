import "./InstamartCards.css";
import {useRef} from "react";
import React from "react";
import vegetable from "../assets/vegetable.png";
import fruits from "../assets/fruits.png";
import dairy from "../assets/dairy.png";
import cereals from "../assets/cerial.png";
import sweet from "../assets/sweet-tooth.png"
import rice from "../assets/rice-atta.png";
import masala from "../assets/masala.png";
import oil from "../assets/oilandgee.png";
import munchies from "../assets/munchies.png";
import coaldrinks from "../assets/colddrinks.png";
import buscuits from "../assets/buisket.png";
import instantfood from "../assets/instantfood.png";
import meat from "../assets/meat.png";
import sauces from "../assets/sauces.png";
import teacoffee from "../assets/teacofee.png";
import cleaning from "../assets/cleaning.png";
import pharma from "../assets/pharma.png";
import bath from "../assets/bath.png";
import paan from "../assets/paan.png";
import home from "../assets/home.png";
import office from "../assets/office.png";
import baby from "../assets/baby.png";
import pet from "../assets/pet.png";
import beauty from "../assets/beauty.png";

const allItems = [
    {name: "Fresh vegetables",image:vegetable}
    ,{name: "Fresh fruits",image:fruits},
    {name: "Dairy , Bread &Eggs",image:dairy},
    {name: "Cereals and Breakfast",image:cereals},
    {name: "Sweet Tooth",image:sweet},
    {name: "Rice, Atta and Dals",image:rice},
    {name: "Masalas and Dry Fruits",image:masala},
    {name: "Oil & Ghee",image:oil},
    {name: "Munchies",image:munchies},
    {name: "Cold Drinks & Juices",image:coaldrinks},
    {name: "Buscuits & Chocolates",image:buscuits},
    {name: "Instant and Frozen Food",image:instantfood},
    {name: "Meat and Seafood",image:meat},
    {name: "Sauces and Spreads",image:sauces},
    {name: "Tea, Coffee and More",image:teacoffee},
    {name: "Cleaning Essentials",image:cleaning},
    {name: "Pharma and Hygiene",image:pharma},
    {name: "Bath, Body and Hair",image:bath},
    {name: "Paan Corner",image:paan},
    {name: "Home and Kitchen",image:home},
    {name: "Office and Electricals",image:office},
    {name: "Baby Care",image:baby},
    {name: "Pet supplies",image:pet},
    {name: "Beauty and Grooming",image:beauty}
];

function InstamartCards() {
const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -450,
      behavior: "smooth"
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 450,
      behavior: "smooth"
    });
  };
  return(
    <div className="instamart-section">
        <div className="instamart-header">
            <h2>Shop Groceries on Instamart</h2>
            <div className="arrow-buttons">
              <button onClick={scrollLeft} className="arrow-btn">←</button>
              <button onClick={scrollRight} className="arrow-btn">→</button>
           </div>
        </div>
        <div className="scroll-wrapper" ref={scrollRef}>
            <div className="row">
                {allItems.map((item, index) => (
            <div key={index} className="instamart-card">
                <div>
                    <button> <img src={item.image} alt={`Item ${index + 1}`} /></button>
                    <div className="instamart-card-info">
                   {item.name}
                </div>
                </div>
                
                
             
            </div>))}
            </div>
          
    </div>
</div>
  );
};

export default InstamartCards;