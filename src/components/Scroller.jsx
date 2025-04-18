import React from 'react';

const Scroller = () => {
    return (
        <>
      <div className="scroller w-full overflow-x-scroll overflow-y-hidden bg-white text-black whitespace-nowrap">
        <div className="inline-block animate-scroll whitespace-nowrap">
          <span className='ml-8 text-[0.8rem] font-bold'>100% ORIGINAL HIGHLY RIGOROUS QUALITY CONTROL</span>
          <span className='ml-8 text-[0.8rem] font-bold'>FREE SHIPPING ON ALL ORDERS</span>
          <span className='ml-8 text-[0.8rem] font-bold'>07 DAYS EASY REFUND & EXCHANGE</span>
        </div>
        <div className="inline-block animate-scroll whitespace-nowrap">
          <span className='ml-8 text-[0.8rem] font-bold'>100% ORIGINAL HIGHLY RIGOROUS QUALITY CONTROL</span>
          <span className='ml-8 text-[0.8rem] font-bold'>FREE SHIPPING ON ALL ORDERS</span>
          <span className='ml-8 text-[0.8rem] font-bold'>07 DAYS EASY REFUND & EXCHANGE</span>
        </div>
      </div>
      </>
    );
  };
  
  export default Scroller;
  