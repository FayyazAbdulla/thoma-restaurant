import { Search, UtensilsCrossed } from "lucide-react"
import bannerbg1 from '../../assets/bannerbg1.jpg';

const Banner = () => {
  return (
    <section className="relative min-h-[500px] w-full bg-gradient-to-b from-red-50 to-white flex items-center justify-center px-4 overflow-hidden mt-10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-red-100 rounded-full opacity-50 animate-float" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-100 rounded-full opacity-50 animate-float-delayed" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-orange-100 rounded-full opacity-50 animate-float" />
      </div>

      <div className="relative max-w-7xl mx-auto w-full py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Welcome to <span className="text-red-600">THOMA</span>
                <br />
                Restaurant
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg">
                Discover delicious meals prepared with love and care. Order now for a taste of excellence!
              </p>
            </div>

            {/* Search Bar */}
            {/* <div className="relative max-w-md mx-auto md:mx-0">
              <div className="flex items-center bg-white rounded-full p-1 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-red-500 shadow-lg transition-shadow duration-300">
                <input
                  type="text"
                  className="flex-grow rounded-full px-6 py-4 focus:outline-none bg-transparent text-base placeholder:text-gray-400"
                  placeholder="Search for your favorite dish..."
                />
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 py-3 px-6 rounded-full text-white font-semibold transition duration-300 hover:shadow-lg">
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
            </div> */}

            {/* Quick Stats */}
            <div className="flex items-center justify-center md:justify-start gap-8 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">500+</p>
                <p className="text-sm text-gray-600">Dishes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">1000+</p>
                <p className="text-sm text-gray-600">Customers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">4.8</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative hidden md:block">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-500">
              <img
                src={bannerbg1}
                alt="Delicious Food"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-gray-900">Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner

