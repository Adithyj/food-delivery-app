import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"; // ✅ YOU MISSED THIS

import Login from "./components/login/login.jsx";
import Signup from "./components/signin/PhoneLogin.jsx";
import OtpVerify from "./components/signin/OtpVerify.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import CategoryPage from "./components/catogary/CategoryPage.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import Restaurants from "./components/restaruant/Restaruants.jsx";
import AddProduct from "./components/admin/AddProduct.jsx";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import Users from "./components/admin/Users";
import AdminCategories from "./components/admin/AdminCategories";
import AdminRestaurants from "./components/admin/AdminRestaurants";
import RestaurantDetails from "./components/restaruant/RestaurantDetails.jsx";
import CartPage from "./components/restaruant/CartPage.jsx";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import CheckOutPage from "./components/restaruant/CheckOutPage.jsx";

const stripePromise = loadStripe(
  "pk_test_51Qc1LIFlNATJ2G6NFyYOw3u4siqArjmyfq5QPniiRUsVT9MGhKcfYgGwIpMMWkVoOcl3fn0rNk91OqqY57tylBBJ0024trWydJ"
);

function App() {
  return (
    <BrowserRouter>
      {/* ✅ WRAP EVERYTHING */}
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signup />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/signup" element={<Login />} />

          <Route path="/category/:categoryName" element={<Restaurants />} />
          <Route path="/redirect/:categoryName" element={<CategoryPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />

          <Route path="/adminlog" element={<AdminLogin />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/restaurants" element={<AdminRestaurants />} />
            <Route path="/admin/products" element={<AddProduct />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </Elements>
    </BrowserRouter>
  );
}

export default App;