import React from 'react';
import { IoLogoInstagram } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { Link } from 'react-router';

function Contact() {
  return (
    <div className='border-t-2 border-white border-b-2 py-1'>
    <div className='bg-[#c6b46d] text-black w-full flex flex-wrap justify-around py-3 px-2.5'>
        <div className='font-[900] text-[1.4rem]'>GET IN TOUCH</div>
        <div className='flex justify-center items-center gap-3'>
          <a href="https://www.instagram.com/prestigeandco___/" target='_blank'>
        <IoLogoInstagram className='h-7 w-7 hover:text-white duration-300 cursor-pointer' />
          </a>
        <a href="http://wa.me/923357225877" target='_blank'>
        <BsWhatsapp className='h-7 w-7 hover:text-white duration-300 cursor-pointer' />
        </a>
        <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=prestigeandco30@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
>
  <SiGmail className="h-7 w-7 hover:text-white duration-300 cursor-pointer" />
</a>
        </div>
    </div>
    </div>
  )
}

export default Contact;