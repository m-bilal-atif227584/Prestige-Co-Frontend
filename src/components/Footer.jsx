import React from 'react';
import logo from '/original.png';
import mastercard from '../assets/Mastercard_logo.webp'
import visacard from '../assets/visalogo.png'
function Footer() {
  return (
    <footer className='w-full border-t-2 border-gray-500 px-4 py-6 bg-black text-white'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto'>

        {/* Logo + Text */}
        <div className='flex flex-col md:flex-row items-center gap-3 text-center md:text-left'>
          <img src={logo} alt="logo" className='h-[70px] object-contain' />
          <p className='text-sm md:text-base'>
            © 2025 <span className='font-semibold'>Timeless Luxe</span>. All Rights Reserved.
          </p>
        </div>

        {/* Payment Logos */}
        <div className='flex gap-4 items-center justify-center flex-wrap'>
          <img
            src={visacard}
            alt="Visa"
            className='h-[40px] object-contain'
          />
          <img
            src={mastercard}
            alt="Mastercard"
            className='h-[24px] object-contain'
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;


// import React from 'react';
// import logo2 from '../assets/logo2.png'

// function Footer() {
//   return (
//     <div className='flex border-t-2 border-gray-500 justify-around items-end px-3 py-6'>
//       <div className="flex justify-center items-end">
//         <img src={logo2} alt="" className='h-[120px]' />
//         <span>Copyright 2025 ©, Timeless Luxe All Rights Reserved.</span>
//       </div>
//       <div className="flex justify-center gap-3.5 items-center">
//         <img src="https://images.seeklogo.com/logo-png/14/2/visa-logo-png_seeklogo-149684.png" alt="" className='h-[68px]' />
//         <img src="https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/13674554/Mastercard_logo.jpg?quality=90&strip=all&crop=0,16.666666666667,100,66.666666666667" alt="" className='h-[40px]' />
//       </div>
//     </div>
//   )
// }

// export default Footer