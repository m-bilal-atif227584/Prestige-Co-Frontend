import React from 'react';
import { Link } from 'react-router';
import useFetch from '../hooks/useFetch';

function ProductCard({img, img2, type, id, title, oldPrice, price}) {

    const {data} = useFetch(`/products?populate=*&[filters][id][$eq]=${id}`);
    // data && data.length > 0 && console.log(data[0].mainImg);
    // console.log(id);
    

    return (
        <Link to={`/product/${id}`} className='flex flex-col items-center justify-center w-[250px]'>
            <div className='relative'>
                {data && data.length > 0 && <img src={data[0].mainImg.url} alt="product" className='h-[260px] w-[240px] rounded-xl relative z-10 object-cover hover:z-[-1] itemimg' />}
                {data && data.length > 0 && <img src={data[0].Img2?.url} alt="" className='h-[260px] w-[240px] rounded-xl absolute top-0 z-[1] object-cover hover:z-10' />}
                <div className={`newtag bg-orange-400 font-bold text-black ${type === 'sale' ? '' : 'hidden'} absolute top-1 left-[5px] rounded-sm text-[0.9rem] z-20 py-[2px] px-[3px] border-1 border-black`}>SALE</div>
                {data && data.length > 0 && <div className={`absolute top-1 newtag right-[5px] z-20 text-black ${data[0].quantity < 1 ? '' : 'hidden'} font-bold text-[0.9rem] py-[2px] px-[3px] border-1 border-black rounded-sm bg-red-500`}>OUT OF STOCK</div>}
            </div>
            <div className='font-bold mt-2'>{title}</div>
            <div className="flex gap-2.5 mt-2">
                <div className={`old ${oldPrice ? '' : 'hidden'} text-gray-500 line-through`}>Rs. {oldPrice}</div>
                <div className="new text-white">Rs. {price}</div>
            </div>
            {data && data.length > 0 && <button className={`text-[1rem] text-black bg-gray-300 border-[3px] ${data[0].quantity < 1 ? 'hidden' : ''} border-gray-700 rounded-full mt-1.5 px-2.5 py-1.5 hover:bg-gray-500 duration-300 cursor-pointer`}>Buy Now</button>}
        </Link>
    )
}

export default ProductCard