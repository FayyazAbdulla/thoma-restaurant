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

import OrderList from "./components/Admin/component/order_view/OrderList";
import View_Order from "./components/Admin/pages/View_Order";
import ClosedOrderList from "./components/Admin/component/closed_orders/ClosedOrderList";

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
        <Route path="/Order_view" element={<OrderList />} />
        <Route path="/View_Order" element={<View_Order />} />
        <Route path="/ClosedOrderList" element={<ClosedOrderList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
