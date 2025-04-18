import React, { useState } from 'react'; 
import watch from '../assets/watch.mp4'
import Premium from './Premium';
// import Brands from './Brands';
import CategorySec from './CategorySec';
import About from './About'
import Contact from './Contact'

function Home() {
  const[sale,setsale] = useState(true)
  return (
    <>
       <video autoPlay loop muted src={watch} className='w-full object-top object-cover xl:h-[87vh]' ></video>
       <CategorySec/>
       {sale ? <Premium type={'SALE'}/> : null}
       <Premium type={'NEW ARRIVALS'}/>
       {/* <Brands/> */}
       <Premium type={"TOP SELLING PRODUCTS"}/>
       <About/>
       <Contact/>
    </>
  )
}

export default Home