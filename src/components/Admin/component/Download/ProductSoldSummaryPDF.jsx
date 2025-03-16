import { useState } from "react";
import { firestore } from "../../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import jsPDF from "jspdf";

const ProductSoldSummaryPDF = () => {
  const [loading, setLoading] = useState(false);

  const downloadPDF = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, "closed_orders"));
      const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Calculate product sold summary
      const productSummary = orders.reduce((acc, order) => {
        order.items.forEach((item) => {
          const productName = item.title;
          acc[productName] = (acc[productName] || 0) + item.quantity;
        });
        return acc;
      }, {});

      // Create PDF
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Product Sold Summary Report", 10, 10);
      doc.setFontSize(12);

      let y = 20;
      Object.entries(productSummary).forEach(([product, quantity]) => {
        doc.text(`${product}: ${quantity}x`, 10, y);
        y += 10;
      });

      doc.save("product_sold_summary.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <p className="text-gray-700 mb-4">
        Download a PDF report summarizing the total quantity of each product sold.
      </p>
      <button
        onClick={downloadPDF}
        disabled={loading}
        className="px-6 py-2 text-white bg-indigo-600 rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating...
          </>
        ) : (
          "Download Product Sold Summary PDF"
        )}
      </button>
    </div>
  );
};

export default ProductSoldSummaryPDF;