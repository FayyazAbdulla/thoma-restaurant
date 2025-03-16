// ProductSalesInsights/utils/calculateProductSalesInsights.js
export const calculateProductSalesInsights = (orders) => {
    // Most Ordered Items
    const itemCounts = orders.reduce((acc, order) => {
      order.items.forEach((item) => {
        const itemName = item.title;
        acc[itemName] = (acc[itemName] || 0) + item.quantity;
      });
      return acc;
    }, {});
  
    const mostOrderedItems = Object.entries(itemCounts)
      .sort(([, a], [, b]) => b - a) // Sort by quantity (descending)
      .map(([itemName, quantity]) => ({
        itemName,
        quantity,
      }));
  
    // Revenue by Category
    const revenueByCategory = orders.reduce((acc, order) => {
      order.items.forEach((item) => {
        const category = item.type;
        acc[category] = (acc[category] || 0) + item.price * item.quantity;
      });
      return acc;
    }, {});
  
    return {
      mostOrderedItems,
      revenueByCategory,
    };
  };
  
  // ProductSalesInsights/utils/formatDataForCharts.js
  export const formatDataForCharts = (orders) => {
    // Sales by Item Type
    const salesByItemType = orders.reduce((acc, order) => {
      order.items.forEach((item) => {
        const itemType = item.type;
        acc[itemType] = (acc[itemType] || 0) + item.price * item.quantity;
      });
      return acc;
    }, {});
  
    // Sales Trends (Daily, Weekly, Monthly)
    const salesTrends = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toISOString().split("T")[0]; // Extract date (YYYY-MM-DD)
      acc[date] = (acc[date] || 0) + order.totalAmount;
      return acc;
    }, {});
  
    return {
      salesByItemType,
      salesTrends,
    };
  };