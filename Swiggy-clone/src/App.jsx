import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Login from "./components/login/login.jsx";
import Signup from "./components/signin/PhoneLogin.jsx";
import OtpVerify from "./components/signin/OtpVerify.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import CategoryPage from "./components/catogary/CategoryPage.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import Restaurants from "./components/restaruant/Restaruants.jsx";
import AdminLayout from "./components/admin/AdminLayout";
import Users from "./components/admin/Users";
import AdminCategories from "./components/admin/AdminCategories";
import AdminRestaurants from "./components/admin/AdminRestaurants";
import RestaurantDetails from "./components/restaruant/RestaurantDetails.jsx";
import CartPage from "./components/restaruant/CartPage.jsx";
import AdminOrders from "./components/admin/AdminOrders.jsx";
import CheckOutPage from "./components/restaruant/CheckOutPage.jsx";
import DineoutDetails from "./components/DineoutDetails.jsx";
import RestaurantPhotos from "./components/RestaurantPhotos.jsx";
import RestaurantMenu from "./components/RestaurantMenu.jsx";
import CategorySlider from "./restaraunt-card/CategorySlider.jsx";
import MyAccount from "./profile/MyAccount";
import UserPanel from "./components/UserPanel.jsx";
const stripePromise = loadStripe(
  "pk_test_51Qc1LIFlNATJ2G6NFyYOw3u4siqArjmyfq5QPniiRUsVT9MGhKcfYgGwIpMMWkVoOcl3fn0rNk91OqqY57tylBBJ0024trWydJ"
);

function App() {
  return (
    <BrowserRouter>

      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/account" element={<MyAccount />} />
            <Route path="/userpanel" element={<UserPanel />} />
          <Route path="/explore" element={<CategorySlider />} />
          <Route path="/login" element={<Signup />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />

          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/restaurant/:id/dineout" element={<DineoutDetails />} />
          <Route path="/restaurant/:id/photos" element={<RestaurantPhotos />} />
          <Route path="/restaurant/:id/menu" element={<RestaurantMenu />} />

          <Route path="/category/:categoryName" element={<Restaurants />} />
          <Route path="/redirect/:categoryName" element={<CategoryPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />

          <Route path="/adminlog" element={<AdminLogin />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="restaurants" element={<AdminRestaurants />} />
            <Route path="orders" element={<AdminOrders />} />


          </Route>

        </Routes>
      </Elements>
    </BrowserRouter>
  );
}

export default App;