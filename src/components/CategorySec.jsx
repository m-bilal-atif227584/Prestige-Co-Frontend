import React from 'react';
import women from '../assets/womenCat.jpg'
import men2 from '../assets/menCat.jpg'
import { Link } from 'react-router';

function CategorySec() {
  return (<div className='px-2.5'>
  <div className="relative mt-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center relative z-[1] sm:w-[310px] w-[290px] mx-auto mb-10 bg-black pb-4">
        SHOP BY CATEGORY
      </h2>
      <div className="line bg-white h-[1px] w-full absolute top-5"></div>
      </div>
    <div className='flex gap-5 flex-wrap justify-around items-center'>
        <Link to={'/products/6'} className="cards ancr card1">
                <div className="overlay">
                    <h4>MEN</h4>
                    <p>Check out our men's watches.</p>
                </div>
            </Link>
            <Link to={'/products/7'} className="cards ancr card2">
                <div className="overlay">
                    <h4>WOMEN</h4>
                    <p>Check out our women watches.</p>
                </div>
            </Link>
    </div>
    </div>
  )
}

export default CategorySec