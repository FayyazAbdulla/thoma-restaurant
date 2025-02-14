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
        title: "Pancakes",
        description: "Fluffy pancakes with maple syrup.",
        price: 8.99,
        foodType: "Breakfast",
        image: "https://example.com/pancakes.jpg"
    },
    {
        title: "Avocado Toast",
        description: "Toasted bread with mashed avocado and spices.",
        price: 7.50,
        foodType: "Breakfast",
        image: "https://example.com/avocado-toast.jpg"
    },
    {
        title: "Eggs Benedict",
        description: "Poached eggs on English muffins with hollandaise sauce.",
        price: 9.99,
        foodType: "Breakfast",
        image: "https://example.com/eggs-benedict.jpg"
    },
    {
        title: "French Toast",
        description: "Thick slices of bread soaked in eggs and milk, then fried.",
        price: 8.50,
        foodType: "Breakfast",
        image: "https://example.com/french-toast.jpg"
    },
    {
        title: "Omelette",
        description: "Fluffy omelette with cheese, tomatoes, and herbs.",
        price: 7.99,
        foodType: "Breakfast",
        image: "https://example.com/omelette.jpg"
    },
    {
        title: "Caesar Salad",
        description: "Fresh romaine lettuce with croutons and Caesar dressing.",
        price: 6.99,
        foodType: "Lunch",
        image: "https://example.com/caesar-salad.jpg"
    },
    {
        title: "Grilled Chicken Sandwich",
        description: "Grilled chicken breast with lettuce, tomato, and mayo.",
        price: 10.99,
        foodType: "Lunch",
        image: "https://example.com/grilled-chicken-sandwich.jpg"
    },
    {
        title: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil.",
        price: 12.99,
        foodType: "Lunch",
        image: "https://example.com/margherita-pizza.jpg"
    },
    {
        title: "Beef Burger",
        description: "Juicy beef patty with cheese, lettuce, and pickles.",
        price: 11.50,
        foodType: "Lunch",
        image: "https://example.com/beef-burger.jpg"
    },
    {
        title: "Vegetable Stir Fry",
        description: "Assorted vegetables stir-fried in a savory sauce.",
        price: 9.99,
        foodType: "Lunch",
        image: "https://example.com/vegetable-stir-fry.jpg"
    },
    {
        title: "Spaghetti Bolognese",
        description: "Spaghetti with a rich meat and tomato sauce.",
        price: 13.99,
        foodType: "Dinner",
        image: "https://example.com/spaghetti-bolognese.jpg"
    },
    {
        title: "Grilled Salmon",
        description: "Grilled salmon fillet with a lemon butter sauce.",
        price: 15.99,
        foodType: "Dinner",
        image: "https://example.com/grilled-salmon.jpg"
    },
    {
        title: "Steak",
        description: "Juicy steak cooked to perfection with mashed potatoes.",
        price: 18.99,
        foodType: "Dinner",
        image: "https://example.com/steak.jpg"
    },
    {
        title: "Chicken Alfredo",
        description: "Creamy Alfredo sauce with grilled chicken and fettuccine.",
        price: 14.50,
        foodType: "Dinner",
        image: "https://example.com/chicken-alfredo.jpg"
    },
    {
        title: "Vegetable Lasagna",
        description: "Layered pasta with vegetables and cheese.",
        price: 12.99,
        foodType: "Dinner",
        image: "https://example.com/vegetable-lasagna.jpg"
    },
    {
        title: "Fruit Salad",
        description: "Fresh seasonal fruits with a honey drizzle.",
        price: 5.99,
        foodType: "Breakfast",
        image: "https://example.com/fruit-salad.jpg"
    },
    {
        title: "Bagel with Cream Cheese",
        description: "Toasted bagel with a generous spread of cream cheese.",
        price: 6.50,
        foodType: "Breakfast",
        image: "https://example.com/bagel-cream-cheese.jpg"
    },
    {
        title: "Yogurt Parfait",
        description: "Layered yogurt with granola and fresh berries.",
        price: 7.99,
        foodType: "Breakfast",
        image: "https://example.com/yogurt-parfait.jpg"
    },
    {
        title: "Chicken Caesar Wrap",
        description: "Grilled chicken, romaine, and Caesar dressing in a wrap.",
        price: 9.99,
        foodType: "Lunch",
        image: "https://example.com/chicken-caesar-wrap.jpg"
    },
    {
        title: "Vegetarian Pizza",
        description: "Pizza topped with assorted vegetables and cheese.",
        price: 11.99,
        foodType: "Lunch",
        image: "https://example.com/vegetarian-pizza.jpg"
    },
    {
        title: "Fish and Chips",
        description: "Crispy fried fish with a side of fries.",
        price: 12.50,
        foodType: "Lunch",
        image: "https://example.com/fish-and-chips.jpg"
    },
    {
        title: "Shrimp Scampi",
        description: "Shrimp cooked in a garlic butter sauce over pasta.",
        price: 16.99,
        foodType: "Dinner",
        image: "https://example.com/shrimp-scampi.jpg"
    },
    {
        title: "Beef Tacos",
        description: "Soft tacos filled with seasoned beef and toppings.",
        price: 10.99,
        foodType: "Dinner",
        image: "https://example.com/beef-tacos.jpg"
    },
    {
        title: "Vegetable Curry",
        description: "Spicy vegetable curry served with rice.",
        price: 11.99,
        foodType: "Dinner",
        image: "https://example.com/vegetable-curry.jpg"
    },
    {
        title: "Chicken Tikka Masala",
        description: "Grilled chicken in a creamy tomato sauce.",
        price: 14.99,
        foodType: "Dinner",
        image: "https://example.com/chicken-tikka-masala.jpg"
    },
    {
        title: "Mushroom Risotto",
        description: "Creamy risotto with sautéed mushrooms.",
        price: 13.50,
        foodType: "Dinner",
        image: "https://example.com/mushroom-risotto.jpg"
    },
    {
        title: "Cheesecake",
        description: "Creamy cheesecake with a graham cracker crust.",
        price: 6.99,
        foodType: "Dessert",
        image: "https://example.com/cheesecake.jpg"
    },
    {
        title: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a gooey center.",
        price: 7.50,
        foodType: "Dessert",
        image: "https://example.com/chocolate-lava-cake.jpg"
    },
    {
        title: "Tiramisu",
        description: "Classic Italian dessert with coffee and mascarpone.",
        price: 8.99,
        foodType: "Dessert",
        image: "https://example.com/tiramisu.jpg"
    },
    {
        title: "Apple Pie",
        description: "Homemade apple pie with a flaky crust.",
        price: 6.50,
        foodType: "Dessert",
        image: "https://example.com/apple-pie.jpg"
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