import React from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "How do I place a takeaway order?",
            answer: "You can place a takeaway order by logging into the website, selecting your combos, adding them to the cart, entering your contact details, and placing the order. You will receive a receipt that you need to present at the counter to collect your order."
        },
        {
            question: "Can I modify my order after placing it?",
            answer: "Unfortunately, once an order is placed, it cannot be modified. Please review your order carefully before confirming."
        },
        {
            question: "What payment methods are accepted?",
            answer: "We accept all major credit/debit cards, mobile payments, and cash on pickup."
        },
        {
            question: "How long does it take to prepare my order?",
            answer: "Orders are typically ready within 20-30 minutes. You will receive a notification when your order is ready for pickup."
        },
        {
            question: "What if I lose my receipt?",
            answer: "If you lose your receipt, please contact our customer support with your order ID, and we will assist you."
        }
    ];

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-primary poppins mb-8">Frequently Asked Questions</h1>
            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 poppins">{faq.question}</h2>
                        <p className="mt-2 text-gray-600 poppins">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;