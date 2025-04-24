import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import conf from '../utils/conf';
import { databases, Query } from '../utils/appwrite';

function Products() {

  const [data, setData] = useState([]);
  const catId = parseInt(useParams().id);
  
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await databases.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCategoryCollectionId,
          [Query.equal('id', catId)]
        );
        if (res.documents.length > 0) {
          setData(res.documents);
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [catId]);

  const head = data[0]?.heading;
  // console.log(data[0]?.product);
  

  return (
    <>
    {data && <h1 className='font-bold mt-7 text-[2rem] text-center text-white'>{head}</h1>}
  <div className='flex px-3 py-5 mt-7 min-h-[454px] justify-center items-start gap-16 flex-wrap'>
  {data[0]?.product?.map((product, index) => (
         <div key={product.id || index}>
            <ProductCard img={product.img1} img2={product.img2} type={product.type} title={product.title} oldPrice={product?.oldPrice} price={product.latestPrice} id={product.id} quantity={product.quantity} category={product.category} />
        </div>
        )
  )
  }
  </div>
  </>
  )
}

export default Products