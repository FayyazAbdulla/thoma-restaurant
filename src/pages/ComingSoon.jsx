import { useEffect, useState } from "react"
import { FaFacebook, FaInstagram, FaTwitter, FaUtensils, FaCocktail, FaCoffee } from "react-icons/fa"

const ComingSoon = () => {
  const [daysLeft, setDaysLeft] = useState(30)

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft((prevDays) => (prevDays > 0 ? prevDays - 1 : 0))
    }, 86400000) // Update every 24 hours
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-red-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white opacity-10 rounded-full animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full text-center relative z-10">
        <h1 className="text-5xl font-bold text-red-600 mb-4 animate-pulse">THOMA Restaurant</h1>
        <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
        <p className="text-2xl font-semibold text-gray-800 mb-4">🍽️ A Culinary Journey Awaits! 🍕</p>
        <p className="text-3xl font-bold text-red-600 mb-8 animate-bounce">Launching in {daysLeft} days! 🎉</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <FaUtensils className="text-red-600 text-4xl mb-2" />
            <p className="font-semibold">Gourmet Cuisine</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCocktail className="text-red-600 text-4xl mb-2" />
            <p className="font-semibold">Craft Cocktails</p>
          </div>
          <div className="flex flex-col items-center">
            <FaCoffee className="text-red-600 text-4xl mb-2" />
            <p className="font-semibold">Artisan Coffee</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xl font-semibold text-gray-700 mb-4">Join our exclusive pre-launch list:</p>
          <form className="flex justify-center mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-red-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded-r-lg hover:bg-red-700 transition-colors duration-300">
              Subscribe
            </button>
          </form>
        </div>

        <div className="mb-8">
          <p className="text-gray-700 mb-4">Follow us for mouth-watering updates:</p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <FaFacebook size={32} className="text-red-600 hover:text-red-700" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <FaInstagram size={32} className="text-red-600 hover:text-red-700" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <FaTwitter size={32} className="text-red-600 hover:text-red-700" />
            </a>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>For reservations or inquiries:</p>
          <p className="font-semibold">contact@thomarestaurant.com | (123) 456-7890</p>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon

