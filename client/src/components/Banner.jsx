import React, { useEffect, useState } from "react";
import bannerimg from "../assets/bannerimg.jpg";
import banners from "../assets/banners.jpg";
import bannersimg from "../assets/banners2.jpg"

const Banner = () => {
  const images = [banners, bannerimg, bannersimg];
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full 
                    h-[400px] sm:h-[500px] md:h-[650px] 
                    overflow-hidden">

      {/* Slider */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Banner"
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Overlay (optional professional touch) */}
      {/* <div className="absolute inset-0 bg-black/30"></div> */}

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
