import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Your Ultimate Tech Paradise Awaits",
      subtitle: "Discover Gadgets That Change Lives",
      offer: "Flash Sale: Premium Headphones 35% Off",
      buttonText1: "Shop Audio",
      buttonText2: "View Collection",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Game Like Never Before",
      subtitle: "Next-Gen Consoles at Unbeatable Prices",
      offer: "Limited Stock: PS5 Bundles Available",
      buttonText1: "Buy Now",
      buttonText2: "See Accessories",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Work Smarter, Create Faster",
      subtitle: "Professional Laptops for Every Need",
      offer: "Exclusive: MacBook Pro with Free Accessories",
      buttonText1: "Explore Macs",
      buttonText2: "Compare Models",
      imgSrc: assets.header_macbook_image,
    },
    {
      id: 4,
      title: "Smart Home Revolution",
      subtitle: "Automate Your Living Space Today",
      offer: "Bundle Deals: Save Up to 40%",
      buttonText1: "Shop Smart Home",
      buttonText2: "Learn More",
      imgSrc: assets.fdg,
    },
    {
      id: 5,
      title: "Capture Life's Best Moments",
      subtitle: "Professional Cameras & Equipment",
      offer: "Weekend Special: Free Lens Included",
      buttonText1: "View Cameras",
      buttonText2: "See Packages",
      imgSrc: assets.dasw,
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br from-blue-50 to-indigo-50 py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-indigo-600 font-medium pb-1">{slide.offer}</p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-bold text-gray-800">
                {slide.title}
              </h1>
              <p className="text-gray-600 mt-2">{slide.subtitle}</p>
              <div className="flex items-center mt-4 md:mt-6 gap-4">
                <button className="md:px-10 px-7 md:py-3 py-2 bg-green-600 hover:bg-indigo-700 rounded-full text-white font-medium transition-colors">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium text-red-600 hover:text-indigo-800 transition-colors">
                  {slide.buttonText2}
                  <Image 
                    className="group-hover:translate-x-1 transition-transform" 
                    src={assets.arrow_icon} 
                    alt="arrow_icon" 
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48 hover:scale-105 transition-transform"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={400}
                height={400}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-colors ${
              currentSlide === index ? "bg-black" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;