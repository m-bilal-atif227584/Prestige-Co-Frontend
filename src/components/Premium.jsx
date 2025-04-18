import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCard';

function Premium({type}) {

    const {data} = useFetch(`/products?populate=*&[filters][type][$eq]=${type}`); //"?populate=*&[filters][type][$eq]=${type}" is a query

    return (
        <div className='pt-24 mx-auto px-3'>
            <div className='flex justify-center items-center flex-col'>
                <h1 className='font-bold text-[2rem] text-center text-white'>{type}</h1>
                <div>
                    <div className='flex justify-center gap-16 flex-wrap items-start py-7'>{data.map((product) => (
                        <div key={product.id}>
                            <ProductCard img={product.mainImg} img2={product.img2} type={product.type} title={product.title} oldPrice={product?.oldPrice} price={product.latestPrice} id={product.id}/>
                        </div>
                    ))}</div>
                </div>
            </div>
        </div>
    )
}

export default Premium