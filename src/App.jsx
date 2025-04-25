import React,{ useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route,} from 'react-router'
import Home from './components/Home'
import Header from './components/Header'
import whatsapp from './assets/whatsapp.webp'
import Products from './components/Products'
import Footer from './components/Footer'
import Checkout from './components/Checkout'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import Success from './components/PaymentSuccess'
import { databases, Query } from './utils/appwrite'
import conf from './utils/conf'
import { useDispatch } from 'react-redux'
import { fetchSaleStatus } from './redux/saleSlice'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSaleStatus());
  }, [dispatch]);

    const[data,setData] = useState([])
    
    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const res = await databases.listDocuments(
              conf.appwriteDatabaseId,
              conf.appwriteCategoryCollectionId,
              [Query.equal('id', 18)]
            );
            setData(res.documents[0].product);
          } catch (error) {
            console.error("Error fetching category:", error);
          }
        };
    
        fetchCategory();
      }, []);

  return (
    <div className='overflow-x-hidden'>
      <BrowserRouter>
      <Header DATA={data} />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products/:id' element={<Products/>} />
        <Route path={`/product/:id`} element={<SingleProduct/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/success' element={<Success/>} /> 
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
