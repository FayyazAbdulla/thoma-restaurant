import { useState } from "react";
import { firestore } from "../../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import jsPDF from "jspdf";

const DailySalesPDF = () => {
  const [loading, setLoading] = useState(false);

  const downloadPDF = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, "closed_orders"));
      const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Group orders by date
      const salesByDate = orders.reduce((acc, order) => {
        const date = new Date(order.createdAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + order.totalAmount;
        return acc;
      }, {});

      // Create PDF
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Daily Sales Report", 10, 10);
      doc.setFontSize(12);

      let y = 20;
      Object.entries(salesByDate).forEach(([date, sales]) => {
        doc.text(`${date}: LKR ${sales.toLocaleString()}`, 10, y);
        y += 10;
      });

      doc.save("daily_sales_report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <p className="text-gray-700 mb-4">
        Download a PDF report summarizing daily sales from closed orders.
      </p>
      <button
        onClick={downloadPDF}
        disabled={loading}
        className="px-6 py-2 text-white bg-teal-600 rounded-lg flex items-center hover:bg-teal-700 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...
          </>
        ) : (
          "Download Daily Sales PDF"
        )}
      </button>
    </div>
  );
};

export default DailySalesPDF;