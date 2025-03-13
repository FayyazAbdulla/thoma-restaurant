// OverviewSection/utils/calculateMetrics.js
export const calculateMetrics = (orders) => {
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const ordersByStatus = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    const averageOrderValue = totalSales / totalOrders || 0;
  
    return {
      totalOrders,
      totalSales,
      ordersByStatus,
      averageOrderValue,
    };
  };