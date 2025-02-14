import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsCart2 } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert2';
import { useOrder } from '../context/OrderProvider';
import useFetch from '../hooks/useFetch';
import Back from '../routes/Back';

const FoodDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [disabled, setDisabled] = useState(false);
    const { title } = useParams();
    const [foods] = useFetch();
    const { handleOrder } = useOrder(); // Ensure handleOrder is destructured
    const navigate = useNavigate();

    const selectedFood = foods?.find((item) => item.title === title);

    const handleAddToCart = () => {
        if (selectedFood) {
            const foodWithQuantity = { ...selectedFood, quantity };
            handleOrder(foodWithQuantity);
            setDisabled(true);
            swal.fire('Wow!!!', 'Your order has been added to the cart', 'success');
            navigate('/place-order'); // Redirect to the PlaceOrder page
        }
    };

    if (!selectedFood) {
        return <div>Loading...</div>;
    }

    return (
        <main className="max-w-screen-xl mx-auto px-6 my-16">
            <Back />
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                    {/* Left side */}
                    <div className="order-2 md:order-1 lg:order-1 flex flex-col justify-center">
                        <h1 className="text-center md:text-left lg:text-left text-3xl lg:text-4xl font-semibold poppins pb-4 text-gray-700 select-none">
                            {selectedFood.title}
                        </h1>
                        <p className="text-center md:text-left lg:text-left text-sm poppins text-gray-500 leading-relaxed select-none">
                            {selectedFood.description}
                        </p>

                        {/* Price and quantity */}
                        <div className="flex items-center justify-center md:justify-start lg:justify-start space-x-6 pt-8">
                            <h1 className="text-3xl font-bold text-black poppins select-none">
                                Rs. {(selectedFood.price * quantity).toFixed(2)}
                            </h1>
                            {/* Quantity */}
                            <div className="flex items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full">
                                <AiOutlineMinus
                                    onClick={() => {
                                        quantity === 1
                                            ? setQuantity(1)
                                            : setQuantity(quantity - 1);
                                    }}
                                    className="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                                />
                                <span className="text-lg text-gray-700 poppins select-none">
                                    {quantity}
                                </span>
                                <AiOutlinePlus
                                    onClick={() => {
                                        setQuantity(quantity + 1);
                                    }}
                                    className="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                                />
                            </div>
                        </div>

                        {/* Add button */}
                        <div className="mt-8 flex items-center justify-center md:justify-start lg:justify-start">
                            <button
                                disabled={disabled}
                                className={
                                    disabled
                                        ? "opacity-30 flex items-center space-x-3 bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
                                        : "flex items-center space-x-3 bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
                                }
                                onClick={handleAddToCart}
                            >
                                <BsCart2 className="text-xl" />
                                <span>{disabled ? 'Added' : 'Add to Cart'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="order-1 md:order-2 lg:order-2">
                        <img
                            src={selectedFood.image}
                            className="w-3/4 md:w-3/4 lg:w-full mx-auto"
                            alt="food"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FoodDetail;