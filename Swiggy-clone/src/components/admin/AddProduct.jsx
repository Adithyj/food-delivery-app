import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProduct.css";

function AddProduct() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [categories,setCategories]=useState("");
  const [deliveryTime,setDelivery]=useState("");



  
const handleAdd = async () => {
  try {

    await axios.post("http://localhost:8080/admin/restaurants", {
      name,   
      image,
      location,
      rating,
      deliveryTime,
      categories
    });


  

    alert("Product Added Successfully");

    navigate("/admin/view-product");

  } 
  catch (err) {
    console.error("FULL ERROR:", err.response?.data || err.message);
    alert("Error adding product");
  }
};



  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <h2>Add restaraunt</h2>

        <input
          type="text"
          placeholder="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />




        <input
          type="number"
          placeholder="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />



        <input
          type="text"
          placeholder="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

<input
          type="text"
          placeholder="Delivery time"
          value={deliveryTime}
          onChange={(e) => setDelivery(e.target.value)}
        />

        <input
          type="text"
          placeholder="categories"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />


        <button onClick={handleAdd}>
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;