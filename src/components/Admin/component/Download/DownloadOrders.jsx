import { useState } from "react";
import { firestore } from "../../../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Loader2 } from "lucide-react";

const DownloadOrders = () => {
  const [loading, setLoading] = useState(false);

  const downloadJson = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, "orders"));
      const orders = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const blob = new Blob([JSON.stringify(orders, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "orders.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading orders:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <p className="text-gray-700 mb-4">
        Download a JSON file containing all orders, including pending, processing, and closed orders.
      </p>
      <button
        onClick={downloadJson}
        disabled={loading}
        className="px-6 py-2 text-white bg-blue-600 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Downloading...
          </>
        ) : (
          "Download All Orders JSON"
        )}
      </button>
    </div>
  );
};

export default DownloadOrders;