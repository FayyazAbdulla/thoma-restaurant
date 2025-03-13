import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/index";
import FoodDetailScreen from "./components/FoodShowCase/FoodDetail";
import PlaceOrder from "./pages/PlaceOrder";
import SignUp from "./pages/SignUp";
import Navbar from "./components/common/Navbar";
import AdminNav from "./components/Admin/component/common/AdminNav"; // Import AdminNav
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn";
import OrderSuccessful from "./pages/OrderSuccessful";
import View_Order from "./components/Admin/pages/View_Order";
import Login from "./components/Admin/pages/Admin_login";

function App() {

  const location = useLocation();

  // Define admin routes where AdminNav should be displayed
  const adminRoutes = ["/View_Order", "/Admin_login"];
  const isAdminPage = adminRoutes.includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar or AdminNav */}
      {isAdminPage ? <AdminNav /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/foods/:title" element={<FoodDetailScreen />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/order-successful" element={<OrderSuccessful />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Admin Pages */}
        <Route path="/View_Order" element={<View_Order />} />
        <Route path="/Admin_login" element={<Login />} />
      </Routes>

      
      {/* Conditionally render Footer only if not an admin page */}
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
