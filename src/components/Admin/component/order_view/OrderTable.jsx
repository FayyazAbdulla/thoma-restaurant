import React, { useState } from "react";
import Pagination from "../common/Pagination";
import OrderDetailsModal from "../common/OrderDetailsModal";
import SearchBar from "../common/SearchBar";
import StatusChangeButton from "../common/StatusChangeButton";
import { Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderTable = ({ orders }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 10;

  // Sorting function
  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig.key) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  // Search/filter function (only by Order ID)
  const filteredOrders = sortedOrders.filter((order) => {
    return order.orderId.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <motion.span
            className="bg-yellow-500 text-white px-2 py-1 rounded-full text-sm animate-realistic-blink"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Pending
          </motion.span>
        );
      case "Completed":
        return (
          <motion.span
            className="bg-green-500 text-white px-2 py-1 rounded-full text-sm"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Completed
          </motion.span>
        );
      case "Cancelled":
        return (
          <motion.span
            className="bg-red-500 text-white px-2 py-1 rounded-full text-sm"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Cancelled
          </motion.span>
        );
      default:
        return (
          <motion.span
            className="bg-gray-500 text-white px-2 py-1 rounded-full text-sm"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Unknown
          </motion.span>
        );
    }
  };

  const convertToLKR = (price) => {
    const exchangeRate = 300; // Example: 1 USD = 300 LKR
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(price * exchangeRate);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order to open the modal
  };

  return (
    <div className="mt-20 mb-20 p-4 ">
      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Table Container with Horizontal Scroll for Mobile */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-red-500 text-white sticky top-0">
            <tr>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("orderId")}
              >
                Order ID{" "}
                {sortConfig.key === "orderId" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="py-3 px-4 text-left cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Created At{" "}
                {sortConfig.key === "createdAt" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="py-3 px-4 text-left">Customer Name</th>
              <th className="py-3 px-4 text-left">Customer Email</th>
              <th className="py-3 px-4 text-left">Customer Phone</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {currentOrders.map((order, index) => {
                const createdAt = order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "N/A";

                return (
                  <motion.tr
                    key={order.orderId}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-red-100 transition-colors`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="py-3 px-4 border-b">{order.orderId}</td>
                    <td className="py-3 px-4 border-b">{createdAt}</td>
                    <td className="py-3 px-4 border-b">
                      {order.customerDetails?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {order.customerDetails?.email || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {order.customerDetails?.phone || "N/A"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <div className="flex items-center gap-3">
                        {/* View Details Button */}
                        <motion.button
                          onClick={() => handleViewDetails(order)}
                          className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
                          title="View Details"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>

                        {/* Status Change Button */}
                        <StatusChangeButton
                          orderId={order.orderId}
                          onStatusChange={() => {
                            // Refresh the orders list after status change
                            setCurrentPage(1);
                            setSearchTerm("");
                          }}
                        />
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            convertToLKR={convertToLKR}
          />
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
};

export default OrderTable;