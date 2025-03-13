// CustomerInsightsSection/utils/calculateCustomerInsights.js
export const calculateCustomerInsights = (orders) => {
    // Recent Customers (last 5 customers)
    const recentCustomers = orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt (descending)
      .slice(0, 5) // Get the last 5 customers
      .map((order) => ({
        name: order.customerDetails.name,
        email: order.customerDetails.email,
        phone: order.customerDetails.phone,
        lastOrderDate: order.createdAt,
      }));
  
    // Top Customers (based on total spending)
    const customerSpending = orders.reduce((acc, order) => {
      const customerEmail = order.customerDetails.email;
      acc[customerEmail] = (acc[customerEmail] || 0) + order.totalAmount;
      return acc;
    }, {});
  
    const topCustomers = Object.entries(customerSpending)
      .sort(([, a], [, b]) => b - a) // Sort by total spending (descending)
      .slice(0, 5) // Get the top 5 customers
      .map(([email, totalSpending]) => ({
        email,
        totalSpending,
      }));
  
    // Customer Orders (number of orders per customer)
    const customerOrders = orders.reduce((acc, order) => {
      const customerEmail = order.customerDetails.email;
      acc[customerEmail] = (acc[customerEmail] || 0) + 1;
      return acc;
    }, {});
  
    return {
      recentCustomers,
      topCustomers,
      customerOrders,
    };
  };