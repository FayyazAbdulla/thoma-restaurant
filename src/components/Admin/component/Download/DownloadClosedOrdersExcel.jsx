import { useState } from "react";
import { firestore } from "../../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import * as XLSX from "xlsx";

const DownloadclosedordersExcel = () => {
  const [loading, setLoading] = useState(false);

  const downloadExcel = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, "closed_orders"));
      const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Convert JSON to Excel
      const worksheet = XLSX.utils.json_to_sheet(orders);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
      XLSX.writeFile(workbook, "closed_orders.xlsx");
    } catch (error) {
      console.error("Error downloading Excel:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <p className="text-gray-700 mb-4">
        Download all closed orders in Excel format for easy analysis and reporting.
      </p>
      <button
        onClick={downloadExcel}
        disabled={loading}
        className="px-6 py-2 text-white bg-purple-600 rounded-lg flex items-center hover:bg-purple-700 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Downloading...
          </>
        ) : (
          "Download Excel"
        )}
      </button>
    </div>
  );
};

export default DownloadclosedordersExcel;