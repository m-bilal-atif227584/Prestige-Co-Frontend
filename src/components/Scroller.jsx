import React from 'react';

const Scroller = () => {
    return (
        <>
      <div className="scroller w-full overflow-x-scroll overflow-y-hidden bg-white text-black whitespace-nowrap">
        <div className="inline-block animate-scroll whitespace-nowrap">
          <span className='ml-8 sm:text-[0.8rem] text-[0.6rem] font-bold'>100% ORIGINAL HIGHLY RIGOROUS QUALITY CONTROL</span>
          <span className='ml-8 sm:text-[0.8rem] text-[0.6rem] font-bold'>PREMIUM QUALITY TIMEPIECES</span>
          <span className='ml-8 sm:text-[0.8rem] text-[0.6rem] font-bold'>EXCLUSIVE COLLECTIONS FOR EVERY OCCASION</span>
        </div>
        <div className="inline-block animate-scroll whitespace-nowrap">
          <span className='ml-8 sm:text-[0.8rem] text-[0.6rem] font-bold'>100% ORIGINAL HIGHLY RIGOROUS QUALITY CONTROL</span>
          <span className='ml-8 sm:text-[0.8rem] text-[0.6rem] font-bold'>PREMIUM QUALITY TIMEPIECES</span>
          <span className='ml-8 sm:text-[0.8rem] text-[0.6rem] font-bold'>EXCLUSIVE COLLECTIONS FOR EVERY OCCASION</span>
        </div>
      </div>
      </>
    );
  };
  
  export default Scroller;
  