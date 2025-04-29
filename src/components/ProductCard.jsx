import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

function ProductCard({ img, img2, id, category, description, quantity, type, title, oldPrice, price }) {

    const [quan, setquan] = useState(1);
    const dispatch = useDispatch()
    const quant = parseInt(quan)
    const navigate = useNavigate()

    const handleBuy = () => {
        dispatch(addToCart({
            id: id,
            title: title,
            desc: description,
            price: price,
            img: img,
            quantity: quant,
        }))
        navigate('/checkout');
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <Link to={`/product/${id}`} className='flex flex-col items-center justify-center w-[250px]'>
                <div className='relative group'>
                    {<img src={img} alt="product" className={`h-[260px] w-[240px] z-[9] rounded-xl absolute top-0 object-cover transition duration-500 ease-in-out ${img2 ? 'group-hover:opacity-0' : ''} group-hover:scale-105`} />}
                    {<img src={img2} alt="" className={`h-[260px] w-[240px] rounded-xl relative z-[10] object-cover transition duration-500 ease-in-out scale-105 opacity-0 ${img2 ? 'group-hover:opacity-100' : ''}`} />}
                    <div className={`newtag bg-orange-400 font-bold text-black ${type?.toLowerCase() === 'sale' || category?.toLowerCase() === 'sale' ? '' : 'hidden'} absolute top-1 left-[5px] rounded-sm text-[0.9rem] z-20 py-[2px] px-[3px] border-1 border-black`}>SALE</div>
                    {<div className={`absolute top-1 newtag right-[5px] z-20 text-black ${quantity < 1 ? '' : 'hidden'} font-bold text-[0.9rem] py-[2px] px-[3px] border-1 border-black rounded-sm bg-red-500`}>OUT OF STOCK</div>}
                </div>
                <div className='font-bold mt-2'>{title}</div>
                <div className="flex gap-2.5 mt-2">
                    <div className={`old ${oldPrice ? '' : 'hidden'} text-gray-500 line-through`}>Rs. {oldPrice} PKR</div>
                    <div className="new text-white">Rs. {price} PKR</div>
                </div>
            </Link>
            {<button className={`text-[1rem] text-black bg-gray-300 border-[3px] ${quantity < 1 ? 'hidden' : ''} border-gray-700 rounded-full w-40 mt-1.5 px-2.5 py-1.5 hover:bg-gray-500 duration-300 cursor-pointer`} onClick={handleBuy}>Buy Now</button>}
        </div>
    )
}

export default ProductCard