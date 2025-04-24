import React, { useState } from 'react'; 
import watch from '../assets/watch.mp4'
import Premium from './Premium';
import ModCategory from './ModCategory';
import CategorySec from './CategorySec';
import About from './About'
import Contact from './Contact'
import ShopByBrands from './Brands';
import ReviewsSection from './ReviewsCont';

function Home() {
  const[sale,setsale] = useState(true)
  return (
    <>
       <video autoPlay loop muted src={watch} className='w-full object-top object-cover xl:h-[87vh]' ></video>
       <ModCategory/>
       <CategorySec/>
       {sale ? <Premium type={'SALE'}/> : null}
       <Premium type={'NEW-ARRIVALS'}/>
       <ShopByBrands/>
       <Premium type={"TOP-SELLING-PRODUCTS"}/>
       <About/>
       <ReviewsSection/>
       <Contact/>
    </>
  )
}

export default Home