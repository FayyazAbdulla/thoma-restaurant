import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCart2 } from 'react-icons/bs';
import useFetch from '../../hooks/useFetch';
import swal from 'sweetalert2';
import { useOrder } from '../../context/OrderProvider';
import useAuth from '../../hooks/useAuth';
import Modal from '../../components/common/Modal'; 
import FoodDetail from './FoodDetail'; 


const FoodItem = ({ image, title, description, price, foodType }) => {
    const { handleOrder } = useOrder();
    const { user } = useAuth();
    const [foods] = useFetch();
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    const selectedFood = foods?.find((item) => item.title === title);

    const handleAddToCart = () => {
        if (!user) {
            swal.fire({
                title: 'Login Required',
                text: 'You need to log in to place an order.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }
        if (selectedFood) {
            const foodWithQuantity = { ...selectedFood, quantity };
            handleOrder(foodWithQuantity);
            swal.fire('Added to Cart!', 'Your order has been added to the cart.', 'success');
        }
    };

    const handleOrderNow = () => {
        if (!user) {
            swal.fire({
                title: 'Login Required',
                text: 'You need to log in to place an order.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }
        setIsModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <>
            <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-6 rounded-lg relative">
                {/* Food Type Badge */}
                <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4">
                    {foodType}
                </span>

                {/* Food Image */}
                <img
                    className="w-48 sm:w-64 mx-auto transform transition duration-300 hover:scale-105"
                    src={image}
                    alt={title}
                />

                {/* Food Details */}
                <div className="flex flex-col items-center my-3 space-y-2">
                    <h1 className="text-gray-900 poppins text-lg text-center font-semibold">{title}</h1>
                    <p className="text-gray-500 poppins text-sm text-center">
                        {description.slice(0, 50)}...
                    </p>
                    <h2 className="text-gray-900 poppins text-2xl font-bold">Rs. {price}</h2>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4 mt-4">
                        <button
                            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full focus:outline-none hover:bg-gray-300"
                        >
                            -
                        </button>
                        <span className="text-gray-900 poppins text-lg">{quantity}</span>
                        <button
                            onClick={() => setQuantity((prev) => prev + 1)}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full focus:outline-none hover:bg-gray-300"
                        >
                            +
                        </button>
                    </div>

                    {/* Buttons - Order Now and Add to Cart */}
                    <div className="flex space-x-4 mt-6">
                        <button
                            className="bg-primary text-white px-6 py-2 focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105 hover:bg-red-600"
                            onClick={handleOrderNow} // Open modal on click
                        >
                            Order Now
                        </button>
                        <button
                            className="bg-green-500 text-white px-6 py-2 focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105 hover:bg-green-600"
                            onClick={handleAddToCart}
                        >
                            <BsCart2 className="inline-block mr-2" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for FoodDetail */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <FoodDetail food={selectedFood} onClose={closeModal} />
            </Modal>
        </>
    );
};

export default FoodItem;