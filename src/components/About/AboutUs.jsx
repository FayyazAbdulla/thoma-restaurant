import React, { useEffect, useState } from 'react';
import AboutItem from './AboutItem';

const AboutUs = () => {
    const [aboutData, setAboutData] = useState([]);

    //fetching about us data
    useEffect(() => {
        fetch('/aboutus.json')
            .then(res => res.json())
            .then(data => setAboutData(data));
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto my-8 sm:my-12 px-4 sm:px-6">
            <h1 className="text-2xl sm:text-4xl poppins pb-2 sm:pb-4">Why you choose us</h1>
            <p className="text-gray-500 text-xs sm:text-sm poppins w-full sm:w-2/4">
                Barton waited twenty always repair in within we do. AN delighted offending curiosity my is dashwoods at. Boy prosperous increasing surrounded.
            </p>

            {/* about us cards  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mt-6 sm:mt-8">
                {aboutData.map(item => (
                    <AboutItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

export default AboutUs;