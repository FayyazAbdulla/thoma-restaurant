import React, { useState } from "react";
import Pagination from "../common/Pagination";
import OrderDetailsModal from "../common/OrderDetailsModal";
import SearchBar from "../common/SearchBar";
import StatusChangeButton from "../common/StatusChangeButton";
import { Eye } from "lucide-react";

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
    return order.id.toLowerCase().includes(searchTerm.toLowerCase());
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
            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-sm animate-realistic-blink">
            Pending
        </span>
        
        );
      case "Completed":
        return (
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
            Completed
          </span>
        );
      case "Cancelled":
        return (
          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-sm">
            Unknown
          </span>
        );
    }
  };

  const convertToLKR = (price) => {
    const exchangeRate = 300; // Example: 1 USD = 300 LKR
    return (price * exchangeRate).toFixed(2); // Convert to LKR and round to 2 decimal places
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order to open the modal
  };

  return (
    <div className="overflow-x-auto mt-20 mb-20 p-4">
      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Table */}
      <table className="min-w-full bg-white border border-red-500">
        <thead>
          <tr className="bg-red-500 text-white">
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => handleSort("id")}
            >
              Order ID{" "}
              {sortConfig.key === "id" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="py-2 px-4 border cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Created At{" "}
              {sortConfig.key === "createdAt" &&
                (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th className="py-2 px-4 border">Customer Name</th>
            <th className="py-2 px-4 border">Country</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => {
            const createdAt = order.createdAt?.toDate
              ? order.createdAt.toDate().toLocaleString()
              : "N/A";

            return (
              <tr key={order.id} className="hover:bg-red-50">
                <td className="py-2 px-4 border">{order.id}</td>
                <td className="py-2 px-4 border">{createdAt}</td>
                <td className="py-2 px-4 border">
                  {order.deliveryDetails?.name || "N/A"}
                </td>
                <td className="py-2 px-4 border">
                  {order.deliveryDetails?.country || "N/A"}
                </td>
                <td className="py-2 px-4 border">
                  {getStatusBadge(order.status)}
                </td>
                <td className="py-2 px-4 border text-center">
                  <div className="flex items-center justify-center gap-3">
                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {/* Status Change Button */}
                    <StatusChangeButton
                      orderId={order.id}
                      onStatusChange={() => {
                        // Refresh the orders list after status change
                        setCurrentPage(1);
                        setSearchTerm("");
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          convertToLKR={convertToLKR}
        />
      )}
    </div>
  );
};

export default OrderTable;
