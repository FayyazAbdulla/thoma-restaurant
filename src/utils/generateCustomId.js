import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { firestore } from '../config/firebase';

export const generateCustomId = async () => {
    try {
        // Reference to the "orders" collection
        const ordersRef = collection(firestore, 'orders');

        // Query the last document in the collection
        const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        let lastId = 'W-001'; // Default ID if no documents exist

        if (!querySnapshot.empty) {
            const lastDoc = querySnapshot.docs[0];
            const lastDocId = lastDoc.id; // Get the last document ID
            const lastNumber = parseInt(lastDocId.split('-')[1], 10); // Extract the number part
            lastId = `W-${String(lastNumber + 1).padStart(3, '0')}`; // Increment and format
        }

        return lastId;
    } catch (error) {
        console.error('Error generating custom ID:', error);
        throw error;
    }
};