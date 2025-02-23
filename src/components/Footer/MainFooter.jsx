import React from 'react';

const MainFooter = () => {
    // Footer links
    // const FooterLinks = [
    //     { id: 1, text: 'About Online Food' },
    //     { id: 2, text: 'Read our blog' },
    //     { id: 3, text: 'Sign up to deliver' },
    //     { id: 4, text: 'Add your restaurant' },
    //     { id: 5, text: 'Get Help' },
    //     { id: 6, text: 'Ask any question' },
    //     { id: 7, text: 'Order Now' },
    //     { id: 8, text: 'Contact' },
    //     { id: 9, text: 'Facebook' },
    //     { id: 10, text: 'Instagram' },
    //     { id: 11, text: 'Twitter' },
    //     { id: 12, text: 'Youtube' },
    // ];

    return (
        <div className="flex flex-col md:flex-row pb-8 items-center text-center md:text-left space-y-8 md:space-y-0">
            {/* Logo */}
            <div className="mb-6 md:mb-0 md:mr-12">
                <h1 className="text-4xl md:text-6xl font-black text-red-600 cursor-pointer hover:text-red-700 transition duration-300">THOMA</h1>
            </div>

            {/* Footer Links */}
            {/* <div className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-12">
                {[0, 4, 8].map((startIndex) => (
                    <div key={startIndex} className="flex flex-col space-y-2 text-sm mb-4 md:mb-0">
                        {FooterLinks.slice(startIndex, startIndex + 4).map(item => (
                            <span className="text-white poppins cursor-pointer hover:text-gray-400 transition duration-300" key={item.id}>{item.text}</span>
                        ))}
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default MainFooter;