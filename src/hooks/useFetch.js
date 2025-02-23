import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase'; // Import firestore from firebase.js

const useFetch = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                // Fetch data from Firestore
                const querySnapshot = await getDocs(collection(firestore, 'foods'));
                const foodItems = querySnapshot.docs.map((doc) => ({
                    _id: doc.id,
                    ...doc.data(),
                }));

                setFoods(foodItems); // Update state with fetched foods
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };

        fetchFoods(); // Call the fetch function
    }, []);

    return [foods]; // Return the fetched foods
};

export default useFetch;