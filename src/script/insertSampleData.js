import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase configuration (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyB9a2LNuH_Q9Ggb5fFxa_Inj32N7zWljCg",
    authDomain: "thoma-db.firebaseapp.com",
    projectId: "thoma-db",
    storageBucket: "thoma-db.firebasestorage.app",
    messagingSenderId: "881242519331",
    appId: "1:881242519331:web:e8524cb96a78d26aa97e96",
    measurementId: "G-HTJ1ZJP82L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample food data
const sampleFoods = [
    {
      "id": 1,
      "title": "Eggs Benedict",
      "description": "A classic breakfast dish with poached eggs, ham, and hollandaise sauce on an English muffin.",
      "price": 1200,
      "image": "/assets/Breakfast/breakfast1.png",
      "type": "Breakfast"
    },
    {
      "id": 2,
      "title": "Breakfast Sandwich",
      "description": "A hearty sandwich filled with eggs, cheese, and your choice of meat, perfect for a quick breakfast.",
      "price": 950,
      "image": "/assets/Breakfast/breakfast2.png",
      "type": "Breakfast"
    },
    {
      "id": 3,
      "title": "Baked Chicken",
      "description": "Juicy and tender baked chicken, seasoned to perfection and served with a side of vegetables.",
      "price": 1800,
      "image": "/assets/Breakfast/breakfast3.png",
      "type": "Breakfast"
    },
    {
      "id": 4,
      "title": "Bagel and Cream Cheese",
      "description": "A fresh bagel topped with creamy cheese, a simple and satisfying breakfast option.",
      "price": 850,
      "image": "/assets/Breakfast/breakfast4.png",
      "type": "Breakfast"
    },
    {
      "id": 5,
      "title": "Fried Egg Toast Brunch",
      "description": "A delicious combination of fried eggs and toast, perfect for a leisurely brunch.",
      "price": 700,
      "image": "/assets/Breakfast/breakfast5.png",
      "type": "Breakfast"
    },
    {
      "id": 6,
      "title": "Toast Croissant Fried Egg",
      "description": "A buttery croissant served with a fried egg, a delightful twist on a classic breakfast.",
      "price": 1100,
      "image": "/assets/Breakfast/breakfast6.png",
      "type": "Breakfast"
    },
    {
      "id": 7,
      "title": "Beef Steak",
      "description": "A succulent beef steak, grilled to your liking and served with a side of mashed potatoes.",
      "price": 2800,
      "image": "/assets/Lunch/lunch1.png",
      "type": "Lunch"
    },
    {
      "id": 8,
      "title": "Honey with Peppers",
      "description": "A sweet and spicy dish featuring honey-glazed peppers, perfect for a light lunch.",
      "price": 1200,
      "image": "/assets/Lunch/lunch2.png",
      "type": "Lunch"
    },
    {
      "id": 9,
      "title": "Tarragon Rubbed Salmon",
      "description": "Fresh salmon rubbed with tarragon and grilled to perfection, served with a side of greens.",
      "price": 2600,
      "image": "/assets/Lunch/lunch3.png",
      "type": "Lunch"
    },
    {
      "id": 10,
      "title": "Indian Lunch",
      "description": "A flavorful Indian meal with a variety of spices, served with rice and naan bread.",
      "price": 1800,
      "image": "/assets/Lunch/lunch4.png",
      "type": "Lunch"
    },
    {
      "id": 11,
      "title": "Fried Chicken Bento",
      "description": "A bento box filled with crispy fried chicken, rice, and a selection of vegetables.",
      "price": 2000,
      "image": "/assets/Lunch/lunch5.png",
      "type": "Lunch"
    },
    {
      "id": 12,
      "title": "Healthy Meal Plan",
      "description": "A balanced meal plan designed to keep you healthy, featuring a variety of nutritious foods.",
      "price": 5000,
      "image": "/assets/Lunch/lunch6.png",
      "type": "Lunch"
    },
    {
      "id": 13,
      "title": "Baked Chicken",
      "description": "Tender baked chicken with a crispy coating, served with a side of roasted vegetables.",
      "price": 1700,
      "image": "/assets/Dinner/dinner1.png",
      "type": "Dinner"
    },
    {
      "id": 14,
      "title": "Lemony Salmon Piccata",
      "description": "A zesty salmon dish with a lemon and caper sauce, served with a side of pasta.",
      "price": 2700,
      "image": "/assets/Dinner/dinner2.png",
      "type": "Dinner"
    },
    {
      "id": 15,
      "title": "Garlic Butter Baked Salmon",
      "description": "Salmon baked in a rich garlic butter sauce, served with a side of steamed vegetables.",
      "price": 2800,
      "image": "/assets/Dinner/dinner3.png",
      "type": "Dinner"
    },
    {
      "id": 16,
      "title": "French Fries with Cheese",
      "description": "Crispy French fries topped with melted cheese, a perfect side dish or snack.",
      "price": 900,
      "image": "/assets/Dinner/dinner4.png",
      "type": "Dinner"
    },
    {
      "id": 17,
      "title": "Pork Tenderloin",
      "description": "Juicy pork tenderloin, seasoned and roasted to perfection, served with a side of mashed potatoes.",
      "price": 2500,
      "image": "/assets/Dinner/dinner5.png",
      "type": "Dinner"
    },
    {
      "id": 18,
      "title": "Lentil Salad",
      "description": "A refreshing salad made with lentils, vegetables, and a light vinaigrette dressing.",
      "price": 1200,
      "image": "/assets/Dinner/dinner6.png",
      "type": "Dinner"
    }
  ];

// Function to insert sample data into Firestore
const insertSampleData = async () => {
    try {
        for (const food of sampleFoods) {
            await addDoc(collection(db, 'foods'), food);
            console.log(`Added: ${food.title}`);
        }
        console.log('All sample data inserted successfully!');
    } catch (error) {
        console.error('Error inserting sample data:', error);
    }
};

// Export the function (optional, if you want to call it from another file)
export { insertSampleData };



// paste below code and run npm run dev 

// import React from "react";
// import { useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import Index from "./pages/index";
// import FoodDetailScreen from "./components/FoodShowCase/FoodDetail";
// import PlaceOrder from "./pages/PlaceOrder";
// import SignUp from "./pages/SignUp";
// import Navbar from "./components/common/Navbar";
// import Footer from "./components/Footer/Footer";
// import SignIn from "./pages/SignIn";
// import OrderSuccessful from "./pages/OrderSuccessful";
// import {insertSampleData} from "./script/insertSampleData";

// function App() {
//   useEffect(() => {
//     insertSampleData();
//   }, []);
//   return (
//     <>
//      <Navbar />
//       <Routes>
//         <Route path="/" element={<Index />} />
//         <Route path="/foods/:title" element={<FoodDetailScreen />} />
//         <Route path="/place-order" element={<PlaceOrder />} />
//         <Route path="/order-successful" element={<OrderSuccessful />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/signin" element={<SignIn/>} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;
