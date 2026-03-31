import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./RestaurantDetails.css";
import deal from "../../assets/deal.png";
import yes from "../../assets/yesbank.png";
import chickenloli from "../../assets/chickenLolipop.png";
import chicken from "../../assets/paneer.png";

function RestaurantDetails() {

  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const res = await axios.get(
          `http://localhost:8080/api/restaurant/${id}`
        );

        setRestaurant(res.data.restaurant);
        setMenu(res.data.menu);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

  }, [id]);



  const getCart = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const getQuantity = (itemId) => {
    const cart = getCart();
    const item = cart.find(i => i._id === itemId);
    return item ? item.quantity : 0;
  };

  const addToCart = (item) => {

    let cart = getCart();

    const existing = cart.find(i => i._id === item._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        restaurantId: id
      });
    }

    saveCart(cart);
    setRefresh(!refresh);
  };

  const decreaseQty = (item) => {

    let cart = getCart();

    const updated = cart.map(i => {
      if (i._id === item._id) {
        i.quantity -= 1;
      }
      return i;
    }).filter(i => i.quantity > 0);

    saveCart(updated);
    setRefresh(!refresh);
  };



  if (!restaurant) return <p>Loading...</p>;

  return (
    <div>

      <Navbar />

      <div className="restaurant-page">


        <div className="restaurant-header">

          <h1 style={{ textAlign: "left", fontSize: "2em" }}>{restaurant.name}</h1>

          <div className="restaurant-box">
            <p><b>⭐ {restaurant.rating} (3.6K+ ratings)
              •
              ₹400 for two</b> </p><p> {restaurant.deliveryTime}</p>
            <p>{restaurant.location}</p>
          </div>

        </div>
        <div className="deal-box">
          <h2>Top Picks</h2>
        </div>
        <div className="top-picks-container">
          <div><img src={chickenloli} alt="" />
            <button >
              ADD
            </button></div>
          <div>
            <img src={chicken} alt="" />
            <button >
              ADD
            </button></div>
        </div>
        <div className="deal-box">
          <h2>Deals for you</h2>
        </div>

        <div className="deal-container">
          <div className="deal-wrapper">
            <div className="deal"><div><img src={deal} alt="" /></div> <h2>Flat ₹125 OFF</h2></div>
            <div className="deal"><div><img src={deal} alt="" /></div><h2>Flat ₹150 OFF</h2></div>
            <div className="deal"><div><img src={deal} alt="" /></div><h2>Flat ₹175 OFF</h2></div>
            <div className="deal"><div><img src={deal} alt="" /></div><h2>Flat ₹200 OFF</h2></div>
            <div className="deal"><div><img src={yes} /></div><h2>7.5% Off Upto ₹100</h2></div>
          </div>
        </div>



        <div className="menu-section">

          <h2>MENU</h2>

          <input
            className="search"
            placeholder="Search for dishes"
          />

          {menu.map((item) => (

            <div className="menu-item" key={item._id}>

              <div className="menu-info">

                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <p className="desc">{item.description}</p>

              </div>

              <div className="menu-img">

                <img
                  src={`http://localhost:8080/${item.image}`}
                  alt={item.name}
                />


                {getQuantity(item._id) === 0 ? (

                  <button  onClick={() => addToCart(item)}>
                    ADD
                  </button>

                ) : (

                  <div className="qty-box">

                    <button onClick={() => decreaseQty(item)}>
                      -
                    </button>

                    <span>{getQuantity(item._id)}</span>

                    <button onClick={() => addToCart(item)}>
                      +
                    </button>

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default RestaurantDetails;