import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import initializeAuthentication from '../config/firebase'; // Adjust the path as needed

const useFetch = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                // Initialize Firebase
                const app = initializeAuthentication();
                const db = getFirestore(app);

                // Fetch data from Firestore
                const querySnapshot = await getDocs(collection(db, 'foods'));
                const foodItems = querySnapshot.docs.map(doc => ({
                    _id: doc.id,
                    ...doc.data()
                }));

                setFoods(foodItems);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };

        fetchFoods();
    }, []);

    return [foods];
};

export default useFetch;