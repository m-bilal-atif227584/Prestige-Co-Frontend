import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './components/Home'
import Header from './components/Header'
import whatsapp from './assets/whatsapp.webp'
import Products from './components/Products'
import Glow from './components/Glow'
import Footer from './components/Footer'
import Checkout from './components/Checkout'
import PaymentSuccess from './components/PaymentSuccess'
import About from './components/About'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'

function App() {

  return (
    <div className='overflow-x-hidden'>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products/:id' element={<Products/>} />
        <Route path={`/product/:id`} element={<SingleProduct/>} />
        <Route path='/cart' element={<Cart/>} />
        {/* <Route path='/checkout' element={<Checkout/>} /> */}
        {/* <Route path='/payment-success' element={<PaymentSuccess/>} /> */}
        {/* <Route path='/product' element={<Product/>} />*/}
        <Route path='/checkout' element={<Checkout/>} /> 
      </Routes>
      <a className='cursor-pointer' href='http://wa.me/923357225877' target='_blank'>
      <img src={whatsapp} alt="" className='h-11 w-11 fixed bottom-3 right-3 z-[100]' />
      </a>
      {/* <Glow/> */}
      <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
