import React from "react";

const Brand = ({ className = "" }) => { 
  return (
    <div className="flex flex-col items-center">
      {/* Brand Title */}
      <h1 className={`text-4xl sm:text-5xl font-black text-red-600 cursor-pointer tracking-wide ${className}`}>
        THOMA
      </h1>

      {/* Tagline */}
      <p className="text-gray-600 text-lg sm:text-xl font-medium mt-2">
        Love at First Bite 🍔
      </p>
      
    </div>
  );
};

export default Brand;
