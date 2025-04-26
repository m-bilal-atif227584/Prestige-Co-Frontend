import React from "react";
import { Link } from "react-router";

const brands = [
  { name: "ROLEX", image: "/assets/rolexx.jpg", link:"products/16" },
  { name: "PATEK PHILLIPE", image: "/assets/patekk.jpg", link:"products/15" },
  // { name: "HUGO BOSS", image: "/assets/hugo.webp" },
  // { name: "BURBERRY", image: "/assets/burr.jpg" },
  // { name: "TOMMY HILFIGER", image: "/assets/tommy.webp" },
  // { name: "FOSSIL", image: "/assets/fossil.jpg" },
];

const ShopByBrands = () => {
  return (
    <section className="sm:px-6 px-2.5 py-10 max-w-7xl mx-auto">
        <div className="relative">
      <h2 className="text-3xl font-semibold text-center relative z-[1] sm:w-[280px] w-[260px] mx-auto mb-10 bg-black pb-4">
        SHOP BY BRANDS
      </h2>
      <div className="line bg-white h-[1px] w-full absolute top-5"></div>
      </div>
      <div className="flex justify-center flex-wrap items-center gap-5">
        {brands.map((brand, index) => (
          <Link
          to={brand.link}
            key={index}
            className="relative group h-48 w-48 overflow-hidden rounded-lg shadow-sm cursor-pointer"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300 ease-in-out"
            />
            <div className="absolute inset-0 bg-[#1b1b1b59] flex items-center justify-center">
              <span className="text-white text-sm sm:text-base font-semibold text-center">
                {brand.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ShopByBrands;
