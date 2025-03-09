import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase'; // Ensure this path is correct

const useFetch = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'foods'));

                if (querySnapshot.empty) {
                    console.warn("No food data found in Firestore.");
                }

                const foodItems = querySnapshot.docs.map((doc) => ({
                    _id: doc.id,
                    ...doc.data(),
                }));

                console.log("Fetched foods:", foodItems); // Debugging log

                setFoods(foodItems);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching foods:', error);
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    return [foods, loading]; // Return foods and loading state
};

export default useFetch;
