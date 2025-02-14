import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import OrderProvider from "./context/OrderProvider.jsx";
import "./index.css";
import App from "./App.jsx";
import DeliveryProvider from "./context/DeliveryProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <OrderProvider>
        <DeliveryProvider>
          <App />
        </DeliveryProvider>
      </OrderProvider>
    </BrowserRouter>
  </StrictMode>
);
