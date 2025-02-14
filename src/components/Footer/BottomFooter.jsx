import React from 'react';

const BottomFooter = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 text-center md:text-left space-y-4 md:space-y-0">
            <div className="mb-4 md:mb-0">
                <span className="poppins text-gray-500">Developed by Code <span className='text-gray-400 text-xl'>X</span></span>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 text-sm">
                <span className="poppins text-white cursor-pointer hover:text-gray-400 transition duration-300">Privacy Policy</span>
                <span className="poppins text-white cursor-pointer hover:text-gray-400 transition duration-300">Terms of Use</span>
                <span className="poppins text-white cursor-pointer hover:text-gray-400 transition duration-300">Pricing</span>
            </div>
        </div>
    );
};

export default BottomFooter;