import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsCart2 } from 'react-icons/bs'; 
import swal from 'sweetalert2';
import { useOrder } from '../../context/OrderProvider';


const FoodDetail = ({ food, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [disabled, setDisabled] = useState(false);
    const { handleOrder } = useOrder();

    const handleAddToCart = () => {
        if (food) {
            const foodWithQuantity = { ...food, quantity };
            handleOrder(foodWithQuantity);
            setDisabled(true);
            swal.fire('Added to Cart!', 'Your order has been added to the cart.', 'success');
            onClose(); 
        }
    };

    if (!food) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold poppins pb-4 text-gray-700">{food.title}</h1>
            <p className="text-sm poppins text-gray-500 leading-relaxed">{food.description}</p>

            {/* Price and quantity */}
            <div className="flex items-center space-x-6 pt-8">
                <h1 className="text-3xl font-bold text-black poppins">Rs. {(food.price * quantity).toFixed(2)}</h1>
                <div className="flex items-center border border-gray-200 px-4 py-2 space-x-6 rounded-full">
                    <AiOutlineMinus
                        onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                        className="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                    />
                    <span className="text-lg text-gray-700 poppins">{quantity}</span>
                    <AiOutlinePlus
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
                    />
                </div>
            </div>

            {/* Add button */}
            <div className="mt-8">
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
    );
};

export default FoodDetail;