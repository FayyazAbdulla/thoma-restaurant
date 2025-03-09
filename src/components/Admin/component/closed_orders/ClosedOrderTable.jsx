import React, { useState } from 'react';
import OrderDetailsModal from '../common/OrderDetailsModal';
import { Eye } from "lucide-react"

const ClosedOrderTable = ({ closedOrders }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Function to convert price to LKR
    const convertToLKR = (price) => {
        const exchangeRate = 300; // Example: 1 USD = 300 LKR
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
        }).format(price * exchangeRate);
    };

    // Function to handle opening the modal
    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="overflow-x-auto mt-20 mb-20 p-4">
            <table className="min-w-full bg-white border border-red-500">
                <thead>
                    <tr className="bg-red-500 text-white">
                        <th className="py-2 px-4 border">Order ID</th>
                        <th className="py-2 px-4 border">Closed At</th>
                        <th className="py-2 px-4 border">Customer Name</th>
                        <th className="py-2 px-4 border">Customer Email</th>
                        <th className="py-2 px-4 border">Customer Phone</th>
                        <th className="py-2 px-4 border">Closing Remark</th>
                        <th className="py-2 px-4 border">Total Price (LKR)</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {closedOrders.map((order) => {
                        const closedAt = order.closedAt?.toDate
                            ? order.closedAt.toDate().toLocaleString()
                            : 'N/A';

                        return (
                            <tr key={order.orderId} className="hover:bg-red-50">
                                <td className="py-2 px-4 border">{order.orderId}</td>
                                <td className="py-2 px-4 border">{closedAt}</td>
                                <td className="py-2 px-4 border">
                                    {order.customerDetails?.name || 'N/A'}
                                </td>
                                <td className="py-2 px-4 border">
                                    {order.customerDetails?.email || 'N/A'}
                                </td>
                                <td className="py-2 px-4 border">
                                    {order.customerDetails?.phone || 'N/A'}
                                </td>
                                <td className="py-2 px-4 border">
                                    {order.closingRemark || 'N/A'}
                                </td>
                                <td className="py-2 px-4 border">{convertToLKR(order.totalPrice)}</td>
                                <td className="py-2 px-4 border">
                                <button
    onClick={() => handleViewDetails(order)}
    className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
    title="View Details"
>
    <Eye className="w-5 h-5" />
</button>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {/* Order Details Modal */}
            {selectedOrder && (
                <OrderDetailsModal
                    order={selectedOrder}
                    onClose={handleCloseModal}
                    convertToLKR={convertToLKR}
                />
            )}
        </div>
    );
};

export default ClosedOrderTable;