import React, { useEffect, useState } from 'react';
import { firestore } from '../../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ClosedOrderTable from './ClosedOrderTable';
import ShimmerLoader from '../common/ShimmerLoader';

const ClosedOrderList = () => {
    const [closedOrders, setClosedOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State to track loading status

    useEffect(() => {
        const fetchClosedOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'closed_orders'));
                const closedOrdersList = querySnapshot.docs.map(doc => ({
                    orderId: doc.id,
                    ...doc.data()
                }));
                setClosedOrders(closedOrdersList);
            } catch (error) {
                console.error('Error fetching closed orders:', error);
            } finally {
                setIsLoading(false); // Stop loading after data is fetched
            }
        };

        fetchClosedOrders();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-red-500">Closed Orders</h1>
            {isLoading ? (
                <ShimmerLoader /> // Display shimmer loader while loading
            ) : (
                <ClosedOrderTable closedOrders={closedOrders} /> // Display table after data is fetched
            )}
        </div>
    );
};

export default ClosedOrderList;