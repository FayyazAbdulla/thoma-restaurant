import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Import combo images
import combo1 from "../../assets/Combo/combo1.jpeg";
import combo2 from "../../assets/Combo/combo2.jpeg";
import combo3 from "../../assets/Combo/combo3.jpeg";
import combo4 from "../../assets/Combo/combo4.jpeg";
import combo5 from "../../assets/Combo/combo5.jpeg";
import combo6 from "../../assets/Combo/combo6.jpeg";
import combo7 from "../../assets/Combo/combo7.jpeg";
import combo8 from "../../assets/Combo/combo8.jpeg";
import combo9 from "../../assets/Combo/combo9.jpeg";
import combo10 from "../../assets/Combo/combo10.jpeg";
import combo11 from "../../assets/Combo/combo11.jpeg";

const Combo = () => {
  const comboImages = [
    combo1,
    combo2,
    combo3,
    combo4,
    combo5,
    combo6,
    combo7,
    combo8,
    combo9,
    combo10,
    combo11,
  ];

  return (
    <div className="relative max-w-screen-xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Combo Packs</h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 3000, // Auto-slide every 3 seconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true} // Enable infinite loop
        className="relative"
      >
        {comboImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <img
                src={image}
                alt={`Combo ${index + 1}`}
                className="w-full h-auto max-w-2xl rounded-lg shadow-lg"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <div className="swiper-button-next bg-opacity-80 p-4 rounded-full shadow-md hover:bg-opacity-100 transition duration-300"></div>
        <div className="swiper-button-prev bg-white bg-opacity-80 p-4 rounded-full shadow-md hover:bg-opacity-100 transition duration-300"></div>
      </Swiper>
    </div>
  );
};

export default Combo;
