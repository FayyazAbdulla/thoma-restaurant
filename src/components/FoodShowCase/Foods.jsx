import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import FoodItem from './FoodItem';
import Skeleton from './Skeleton';
import Pagination from '../common/Pagination'; // Import the Pagination component

const Foods = () => {
    const [menuTab, setMenuTab] = useState('Breakfast');
    const [loading, setLoading] = useState(false);
    const [foods] = useFetch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Number of items to display per page

    // Loading
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    // Food menu tab
    const handleMenuTabs = (type) => {
        setMenuTab(type);
        setCurrentPage(1); // Reset to the first page when the tab changes
    };

    // Filter foods based on the selected tab
    const filteredFoods = foods.filter((item) => menuTab === item.foodType);

    // Calculate total pages
    const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

    // Get the current page's foods
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section className="my-12 max-w-screen-xl mx-auto px-4 sm:px-6">
            {/* Food Menu tab */}
            <div className="flex flex-wrap items-center justify-center space-x-4 sm:space-x-6">
                <p
                    className={menuTab === 'Breakfast' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"}
                    onClick={() => handleMenuTabs('Breakfast')}
                >
                    Breakfast
                </p>
                <p
                    className={menuTab === 'Lunch' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"}
                    onClick={() => handleMenuTabs('Lunch')}
                >
                    Lunch
                </p>
                <p
                    className={menuTab === 'Dinner' ? "active_menu_tab poppins bg-primary" : "menu_tab poppins"}
                    onClick={() => handleMenuTabs('Dinner')}
                >
                    Dinner
                </p>
            </div>

            {/* All foods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {loading
                    ? Array.from({ length: itemsPerPage }).map((_, index) => <Skeleton key={index} />)
                    : currentFoods.map((item) => <FoodItem key={item._id} {...item} />)}
            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </section>
    );
};

export default Foods;