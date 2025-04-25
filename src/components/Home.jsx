import React, { useState, useEffect } from 'react'; 
import watch from '../assets/watch.mp4'
import Premium from './Premium';
import ModCategory from './ModCategory';
import CategorySec from './CategorySec';
import About from './About'
import Contact from './Contact'
import ShopByBrands from './Brands';
import ReviewsSection from './ReviewsCont';
import { useSelector } from 'react-redux';

function Home() {

  const sale = useSelector(state => state.sale.isSale);
  
  return (
    <>
       <video autoPlay loop muted src={watch} className='w-full object-top object-cover xl:h-[87vh]' ></video>
       <ModCategory/>
       <CategorySec/>
       <ShopByBrands/>
       {sale && <Premium type={'SALE'}/>}
       <Premium type={'NEW-ARRIVALS'}/>
       <Premium type={"TOP-SELLING-PRODUCTS"}/>
       <About/>
       <ReviewsSection/>
       <Contact/>
    </>
  )
}

export default Home