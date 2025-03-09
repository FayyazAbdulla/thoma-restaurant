import React from 'react';

const ShimmerLoader = () => {
    return (
        <div className="animate-pulse space-y-4">
            {/* Table Header Shimmer */}
            <div className="h-10 bg-gray-300 rounded"></div>

            {/* Table Rows Shimmer */}
            {[...Array(5)].map((_, index) => (
                <div key={index} className="h-12 bg-gray-200 rounded"></div>
            ))}
        </div>
    );
};

export default ShimmerLoader;