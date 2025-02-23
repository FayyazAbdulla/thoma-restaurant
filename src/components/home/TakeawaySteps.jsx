import React from 'react';

const TakeawaySteps = () => {
    const steps = [
        {
            step: 1,
            title: "Login into the Page",
            description: "Log in to your account on our website. If you don't have an account, you can create one quickly."
        },
        {
            step: 2,
            title: "Select Your Combos",
            description: "Browse through our menu and select your favorite combos. Add them to your cart."
        },
        {
            step: 3,
            title: "Enter Contact Details",
            description: "Provide your contact details, including your name, phone number, and email address."
        },
        {
            step: 4,
            title: "Place Your Order",
            description: "Review your order and proceed to place it. You will receive an order confirmation."
        },
        {
            step: 5,
            title: "Take Your Receipt",
            description: "Download and save your order receipt. You will need to present this receipt at the counter to collect your order."
        },
        {
            step: 6,
            title: "Collect Your Order",
            description: "Visit our store and present your receipt at the counter to collect your order."
        }
    ];

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-primary poppins mb-8">How to Place a Takeaway Order</h1>
            <div className="space-y-8">
                {steps.map((step) => (
                    <div key={step.step} className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-white text-xl font-bold poppins">{step.step}</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 poppins">{step.title}</h2>
                            <p className="mt-2 text-gray-600 poppins">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TakeawaySteps;