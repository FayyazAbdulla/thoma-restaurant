import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-red-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">THOMA Restaurant</h1>
        <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
        <p className="text-xl font-semibold text-gray-800 mb-4">🍽️ Exciting flavors are on the way! 🍕</p>
        <p className="text-2xl font-bold text-red-600 mb-8">We're launching soon. Stay tuned! 🎉</p>
        <div className="mb-8">
          <p className="text-gray-700 mb-4">Follow us for updates:</p>
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
          <p className="font-semibold">contact@thomarestaurant.com</p>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon

