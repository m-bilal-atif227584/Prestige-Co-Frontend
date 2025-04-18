import React from 'react';
import men from '../assets/menPreview.avif'
import women from '../assets/womenPreview.avif'
import smart from '../assets/smartPreview.avif'
import men2 from '../assets/menPrev2.jpg'
import men3 from '../assets/menPrev3.webp'
function CategorySec() {
  return (
    <div className='py-8 flex flex-wrap justify-around items-center mt-14'>
        <div className='relative flex justify-center items-center border-2 border-white'>
            <h1 className='absolute z-[3] font-bold text-[2rem] mt-32 text-white'>MEN</h1>
            <div className="absolute hover:bg-[#23232372] cursor-pointer z-[2]  bg-[#3939395c] h-full w-full"></div>
            <img src={men2} alt="" className='h-[300px] w-[350px] object-cover' />
        </div>
        <div className='relative flex justify-center items-center border-2 border-white'>
            <h1 className='absolute z-[3] mt-32 font-bold text-[2rem] text-white'>WOMEN</h1>
            <div className="absolute z-[2]  bg-[#3939395c] hover:bg-[#23232372] cursor-pointer h-full w-full"></div>
            <img src={women} alt="" className='h-[300px] w-[350px] object-cover object-bottom' />
        </div>
    </div>
  )
}

export default CategorySec