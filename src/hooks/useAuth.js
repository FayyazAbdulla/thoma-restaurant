import { useState, useEffect } from 'react';
import { auth } from '../config/firebase'; // Adjust the path as needed

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return user;
};

export default useAuth;