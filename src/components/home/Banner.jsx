import React from 'react';

const Banner = () => {
    return (
        <section className="header-banner h-80 md:h-96 w-full bg-yellow-50 flex items-center justify-center px-4">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
                {/* Title */}
                <h1 className="text-2xl md:text-4xl lg:text-5xl poppins font-semibold text-gray-700 leading-tight">
                    Best food waiting for your belly
                </h1>

                {/* Search Bar */}
                <div className="w-full max-w-sm md:max-w-lg lg:max-w-xl flex items-center bg-white rounded-full p-1 ring-red-300 focus-within:ring-4 shadow-md">
                    <input 
                        type="text" 
                        className="flex-grow rounded-full px-4 py-3 focus:outline-none bg-transparent text-sm md:text-base" 
                        placeholder="Search here..."
                    />
                    <button className="text-sm md:text-base bg-primary py-3 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform">
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Banner;
