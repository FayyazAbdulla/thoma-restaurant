import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import FoodDetailScreen from "./components/FoodShowCase/FoodDetail";
import PlaceOrder from "./pages/PlaceOrder";
import SignUp from "./pages/SignUp";
import Navbar from "./components/common/Navbar";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn";
import OrderSuccessful from "./pages/OrderSuccessful";

import View_Order from "./components/Admin/pages/View_Order";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/foods/:title" element={<FoodDetailScreen />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order-successful" element={<OrderSuccessful />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Admin Pages */}
        <Route path="/View_Order" element={<View_Order />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
