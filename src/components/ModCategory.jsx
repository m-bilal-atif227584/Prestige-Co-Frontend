import React from "react";
import { Link } from "react-router";

const categories = [
  { title: "Men Watches", image: "/assets/modmen.jpg", link:"/products/6" },
  { title: "Under 5,000", image: "/assets/modluxury.jpg", link:"/products/22" },
  { title: "Women Watches", image: "/assets/modwomen.webp", link:"/products/7" },
  { title: "Luxury Watches", image: "/assets/modcheap.avif", link:"/products/23" },
];

const CategoriesSection = () => {
  return (
    <section className="px-4 py-10 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-6 justify-center">
        {categories.map((item, index) => (
          <Link to={item.link}
            key={index}
            className="relative flex items-center bg-black border-2 border-white rounded-xl overflow-hidden w-full sm:w-[270px] h-[90px] transition transform hover:scale-105 hover:bg-[#2d2d2de6] duration-200 cursor-pointer"
          >
            {/* Diagonally clipped image block */}
            <div className="w-[90px] h-full relative shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
                }}
              />
            </div>
            {/* Title text */}
            <div className="pl-4 text-[#F4DF8B] font-medium text-sm sm:text-base z-10">
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
