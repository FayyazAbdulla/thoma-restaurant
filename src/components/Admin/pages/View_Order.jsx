import React, { useState } from "react";
import ClosedOrderList from "../component/closed_orders/ClosedOrderList";
import OrderList from "../component/order_view/OrderList";

function View_Order() {
    // State to manage the current view ('Pending' or 'Closed')
    const [view, setView] = useState("Pending");

    // Function to render toggle buttons dynamically
    const renderToggleButton = (label) => {
        const isActive = view === label;
        return (
            <button
                onClick={() => !isActive && setView(label)}
                className={`px-5 py-2 rounded-full transition-colors font-semibold ${
                    isActive ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-pressed={isActive}
            >
                {label} Orders
            </button>
        );
    };

    return (
        <div className="p-20 mt-10">
            {/* Toggle Buttons */}
            <div className="flex space-x-4 mb-8">
                {renderToggleButton("Pending")}
                {renderToggleButton("Closed")}
            </div>

            {/* Display Component Based on View */}
            <div className="mt-4">
                {view === "Pending" ? <OrderList /> : <ClosedOrderList />}
            </div>
        </div>
    );
}

export default View_Order;
