import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import FoodDetailScreen from "./pages/FoodDetail";
import PlaceOrder from "./pages/PlaceOrder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/foods/:title" element={<FoodDetailScreen />} />
        <Route path="/place-order" element={<PlaceOrder />} />
      </Routes>
    </>
  );
}

export default App;
