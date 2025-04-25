import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import conf from '../utils/conf';
import { databases, Query } from '../utils/appwrite';

function Premium({type}) {

    const [data,setData] = useState()

     useEffect(() => {
        const fetchCategory = async () => {
          try {
            const res = await databases.listDocuments(
              conf.appwriteDatabaseId,
              conf.appwriteProductCollectionId,
              [Query.equal('type'.toLowerCase(), type.toLowerCase())]
            );
            if (res.documents.length > 0) {
              setData(res.documents);
            }
          } catch (error) {
            console.error("Error fetching category:", error);
          }
        };
    
        fetchCategory();
      }, []);
      

    return (
      <div className='max-w-7xl mx-auto mt-16 px-2.5'>
        <div className="relative">
      <h2 className={`text-3xl font-semibold text-center relative z-[1] ${type == "TOP-SELLING-PRODUCTS" ? 'sm:w-[375px] w-[350px]' : ''} mx-auto ${type == "NEW-ARRIVALS" ? 'sm:w-[245px] w-[225px]' : ''} mb-10 bg-black ${type == "SALE" ? 'sm:w-[100px] w-[85px]' : ''} pb-4`}>
      {type.replace(/[-_]/g, ' ')}
      </h2>
      <div className="line bg-white h-[1px] w-full absolute top-5"></div>
      </div>
        <div className='mx-auto px-3'>
            <div className='flex justify-center items-center flex-col'>
                {/* <h1 className='font-bold text-[1.85rem] text-center text-white'>{type.replace(/[-_]/g, ' ')}</h1> */}
                <div>
                    <div className='flex justify-center gap-16 flex-wrap items-start pb-7'>{data && data.length > 0 && data.map((product) => (
                        <div key={product.id}>
                            <ProductCard img={product.img1} img2={product?.img2} type={product.type} title={product.title} oldPrice={product?.oldPrice} description={product.description} price={product.latestPrice} id={product.id} quantity={product.quantity} category={product.category} />
                        </div>
                    ))}</div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Premium