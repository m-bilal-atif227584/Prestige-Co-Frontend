import React from 'react';
// import data from './Data';
import ProductCard from './ProductCard';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';

function Products() {

  const catId = parseInt(useParams().id);
  const { data } = useFetch(`/categories?populate=*&[filters][id][$eq]=${catId}`)
  // console.log(data);
  

  return (
    <>
    {data && data.length > 0 && <h1 className='font-bold mt-7 text-[2rem] text-center text-white'>{data[0].heading}</h1>}
  <div className='flex px-3 py-5 mt-7 min-h-[454px] justify-center items-start gap-16 flex-wrap'>
  {data && data.length > 0 && data[0].products.map((product) => (
         <div key={product.id}>
            <ProductCard img={product.mainImg} img2={product.img2} type={product.type} title={product.title} oldPrice={product?.oldPrice} price={product.latestPrice} id={product.id}/>
        </div>
        )
  )
  }
  </div>
  </>
  )
}

export default Products