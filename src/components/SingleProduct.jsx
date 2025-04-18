import React, { useState } from "react";
import watch from '../assets/watch1.avif'
import watch2 from '../assets/watch3.avif'
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const SingleProduct = () => {

    const id = useParams().id;
    const [quantity, setQuantity] = useState(1); 
    
    const { data } = useFetch(`/products?populate=*&[filters][id][$eq]=${id}`)
    console.log(data && data.length > 0 && data[0].Img2?.url);
    
    const [SelectedImg, setSelectedImg] = useState("mainImg")
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        // Add-to-cart logic (you can connect this to context or backend)
        alert(`Added ${quantity} ${product.name} to cart`);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex gap-8 flex-col-reverse">
                <div className="flex items-center justify-start gap-3">
                    <img className={`h-16 w-16 object-cover rounded-sm ${ SelectedImg === "mainImg" ? 'border-2 border-green-400' : null} cursor-pointer`} src={data && data.length > 0 && import.meta.env.VITE_APP_UPLOAD_URL + data[0].mainImg.url} alt="" onClick={() => setSelectedImg("mainImg")} />
                    <img className={`h-16 w-16 object-cover rounded-sm ${ SelectedImg === "Img2" ? 'border-2 border-green-400' : null} cursor-pointer`} src={data && data.length > 0 && data[0].Img2?.url} alt="" onClick={() => setSelectedImg("Img2")} />
                    <img className={`h-16 w-16 object-cover rounded-sm ${ SelectedImg === "Img3" ? 'border-2 border-green-400' : null} cursor-pointer`} src={data && data.length > 0 && import.meta.env.VITE_APP_UPLOAD_URL + data[0].Img3?.url} alt="" onClick={() => setSelectedImg("Img3")} />
                    <img className={`h-16 w-16 object-cover rounded-sm ${ SelectedImg === "Img4" ? 'border-2 border-green-400' : null} cursor-pointer`} src={data && data.length > 0 && data[0].Img4?.url} alt="" onClick={() => setSelectedImg("Img4")} />
                </div>
                <img
                    // src={SelectedImg}
                    src={data && data.length > 0 && data[0][SelectedImg]?.url}
                    alt={data && data.length > 0 && data[0].title}
                    className="w-[460px] h-[400px] object-cover rounded-2xl shadow-lg"
                />
            </div>
            <div className="flex flex-col justify-center">
                <h1 className="text-[2rem] font-bold mb-4">{data && data.length > 0 && data[0].title}</h1>
                <p className="text-xl text-white font-[600] text-[1.23rem] mb-2">Rs.{data && data.length > 0 && data[0].latestPrice} PKR</p>
                <p className="text-white text-[1.1rem] mb-6">{data && data.length > 0 && data[0].description}</p>

                <div className="flex items-center space-x-4 mb-6">
                    <label className="text-[1.1rem] text-gray-400">Quantity:</label>
                    <div className="flex gap-1">
                    <button className="bg-black border-1 border-gray-400 rounded-sm w-[30px] text-center cursor-pointer" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <input type="text" readOnly value={parseInt(quantity)}
                        className="w-20 outline-none px-2 py-1 border border-gray-400 rounded"
                    />
                    <button className="bg-black border-1 border-gray-400 rounded-sm w-[30px] text-center cursor-pointer" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                </div>

                {data && data.length > 0 && <button
                    onClick={() => dispatch(addToCart({
                        id:data[0].id,
                        title:data[0].title,
                        desc:data[0].description,
                        price:data[0].latestPrice,
                        img:data[0].mainImg.url,
                        quantity,
                    }))}
                    className="bg-black border-[3px] border-white text-white w-[270px] py-3 rounded-xl shadow-lg shadow-gray-600 hover:bg-[rgba(150,150,150,0.304)] duration-200 btn transition cursor-pointer"
                >
                    Add to Cart
                </button>}
                <div className="text-gray-400 text-[1rem] mt-5">- Stainless Steel</div>
                <div className="text-gray-400 text-[1rem] mt-1">- Rust Proof</div>
                <div className="text-gray-400 text-[1rem] mt-1">- Water Resistant</div>
                <div className="text-gray-400 text-[1rem] mt-1">- Comes with one year warranty</div>
            </div>
        </div>
    );
};

export default SingleProduct;
