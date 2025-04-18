import React from 'react';
import { IoLogoInstagram } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

function Contact() {
  return (
    <div className='border-t-2 border-white border-b-2 py-1'>
    <div className='bg-[#c6b46d] text-black w-full flex flex-wrap justify-around py-3 px-2.5'>
        <div className='font-[900] text-[1.4rem]'>GET IN TOUCH</div>
        <div className='flex justify-center items-center gap-3'>
        <IoLogoInstagram className='h-7 w-7 hover:text-white duration-300 cursor-pointer' />
        <BsWhatsapp className='h-7 w-7 hover:text-white duration-300 cursor-pointer' />
        <FaSquareFacebook className='h-7 w-7 hover:text-white duration-300 cursor-pointer' />
        <SiGmail className='h-7 w-7 hover:text-white duration-300 cursor-pointer' />
        </div>
    </div>
    </div>
  )
}

export default Contact;