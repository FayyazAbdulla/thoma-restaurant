import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search by Order ID..."
                value={searchTerm}
                onChange={onSearchChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
        </div>
    );
};

export default SearchBar;