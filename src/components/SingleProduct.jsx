import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import conf from "../utils/conf";
import { databases, Query } from "../utils/appwrite";

const SingleProduct = () => {

    const [data,setData] = useState()
    const Id = parseInt(useParams().id);
    const [quantity, setQuantity] = useState(1); 
    
    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const res = await databases.listDocuments(
              conf.appwriteDatabaseId,
              conf.appwriteProductCollectionId,
              [Query.equal('id', Id)]
            );
            if (res.documents.length > 0) {
              setData(res.documents);
            }
          } catch (error) {
            console.error("Error fetching category:", error);
          }
        };
    
        fetchCategory();
      }, [Id]);
    //   console.log(data);
      
    
    const [SelectedImg, setSelectedImg] = useState("img1")
    const dispatch = useDispatch()

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex gap-8 flex-col-reverse">
                <div className="flex items-center justify-start gap-3">
                    <img className={`h-16 w-16 object-cover rounded-sm ${ SelectedImg === "img1" ? 'border-2 border-green-400' : null} cursor-pointer`} src={data && data[0]?.img1} alt="" onClick={() => setSelectedImg("img1")} />
                    {data && data.length > 0 && <img className={`h-16 w-16 object-cover ${ data[0]?.img2 ? '' : 'hidden' } rounded-sm ${ SelectedImg === "img2" ? 'border-2 border-green-400' : null} cursor-pointer`} src={data && data[0]?.img2} alt="" onClick={() => setSelectedImg("img2")} />}
                    {data && data.length > 0 && <img className={`h-16 w-16 object-cover ${ data[0]?.img3 ? '' : 'hidden' } rounded-sm ${ SelectedImg === "img3" ? 'border-2 border-green-400' : null} cursor-pointer`} src={data && data[0]?.img3} alt="" onClick={() => setSelectedImg("img3")} />}
                    {data && data.length > 0 && <img className={`h-16 w-16 object-cover ${ data[0]?.img4 ? '' : 'hidden' } rounded-sm ${ SelectedImg === "img4" ? 'border-2 border-green-400' : null} cursor-pointer`} src={data && data[0]?.img4} alt="" onClick={() => setSelectedImg("img4")} />}
                </div>
                <div className="relative">
                <img
                    // src={SelectedImg}
                    src={data && data[0][SelectedImg]}
                    alt={data && data[0]?.title}
                    className="w-[460px] h-[400px] object-cover rounded-2xl shadow-lg"
                />
                                {data && data.length > 0 && <div className={`newtag bg-orange-400 font-bold text-black ${data && data.length > 0 && data[0]?.type?.toLowerCase() === 'sale' || data[0].category?.toLowerCase() === 'sale' ? '' : 'hidden'} absolute top-1 left-[8px] rounded-sm text-[1rem] z-20 py-[2px] px-[3px] border-1 border-black`}>SALE</div>}
{<div className={`absolute top-1 newtag sm:left-[55%] left-[65%] z-20 text-black ${data && data.length > 0 && data[0]?.quantity < 1 ? '' : 'hidden'} font-bold text-[1rem] py-[2px] px-[3px] border-1 border-black rounded-sm bg-red-500`}>OUT OF STOCK</div>}
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <h1 className="text-[2rem] font-bold mb-4">{data && data.length > 0 && data[0].title}</h1>
                <div className="flex gap-3">
                {data && data.length > 0 && <p className={`text-[18px] text-gray-500 line-through font-[600] ${data[0]?.oldPrice ? '' : 'hidden'} text-[1.23rem] mb-2`}>Rs.{data && data.length > 0 && data[0].oldPrice} PKR</p>}
                <p className="text-xl text-white font-[600] text-[1.23rem] mb-2">Rs.{data && data.length > 0 && data[0].latestPrice} PKR</p>
                </div>
                <p className="text-white text-[1.1rem] mb-6">{data && data.length > 0 && data[0].description}</p>

                {data && data[0]?.quantity > 0 && <div className="flex items-center space-x-4 mb-6">
                    <label className="text-[1.1rem] text-gray-400">Quantity:</label>
                    <div className="flex gap-1">
                    <button className="bg-black border-1 border-gray-400 rounded-sm w-[30px] text-center cursor-pointer" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    <input type="text" readOnly value={parseInt(quantity)}
                        className="w-20 outline-none px-2 py-1 border border-gray-400 rounded"
                    />
                    <button className="bg-black border-1 border-gray-400 rounded-sm w-[30px] text-center cursor-pointer" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                </div>}

                {data && data.length > 0 && data[0]?.quantity > 0 && <button
                    onClick={() => dispatch(addToCart({
                        id:data[0].id,
                        title:data[0].title,
                        desc:data[0].description,
                        price:data[0].latestPrice,
                        img:data[0].img1,
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
