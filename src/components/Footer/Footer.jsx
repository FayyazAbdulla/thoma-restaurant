import React from 'react';
import BottomFooter from './BottomFooter';
import MainFooter from './MainFooter';

const Footer = () => {
    return (
        <footer className="bg-gray-800 px-4 py-8 sm:px-6 sm:py-12">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                <MainFooter />
                <BottomFooter />
            </div>
        </footer>
    );
};

export default Footer;