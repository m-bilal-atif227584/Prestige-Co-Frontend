import React, { useState } from "react";
import { Link } from "react-router";
import { ImBin } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux"
import { removeItem, resetCart } from "../redux/CartReducer";

const Cart = () => {

  const products = useSelector(state => state.cart.products)
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += (Number(item.price.replace(/,/g, '')) * Number(item.quantity));
    });
    return total;
  }
  // console.log(products && products.length > 0 && products[0].price)
  // console.log(products && products.length > 0 && products[0].quantity)

  return (
    <div className="max-w-5xl min-h-[454px] mx-auto px-4 py-10">
      <h2 className="text-3xl text-center font-bold mb-8 text-white">YOUR SHOPPING CART</h2>

      {products.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-400 text-[1.4rem] text-center mt-32">Your cart is currently empty.</p>
          <Link to={'/products/18'} className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 w-[200px] text-center mt-6 transition">Continue Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {products && products.length > 0 && products?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-6 bg-white/10 p-4 rounded-xl shadow-md backdrop-blur-md"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item?.img}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                  <p className="text-gray-400">Rs.{item.price} PKR</p>

                  {/* Quantity buttons */}
                  <div className="flex items-center gap-2 mt-3">
                    {/* <button
                      onClick={() => decrementQty(item.id)}
                      className="w-8 h-8 bg-white text-black rounded hover:bg-gray-200 text-lg font-bold"
                    >
                      −
                    </button> */}
                    <span className="text-white font-medium text-lg">x {item.quantity}</span>
                    {/* <button
                      onClick={() => incrementQty(item.id)}
                      className="w-8 h-8 bg-white text-black rounded hover:bg-gray-200 text-lg font-bold"
                    >
                      +
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  Rs.{(Number(item.price.replace(/,/g, '')) * Number(item.quantity)).toLocaleString()} PKR
                </p>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-red-500 hover:text-red-700 mt-4"><ImBin className="h-7 w-7 text-center cursor-pointer mr-5" /></button>
              </div>
            </div>
          ))}
          <div className="bg-red-500 px-2.5 py-1 rounded-lg cursor-pointer hover:bg-red-700 duration-300 text-black w-[170px] text-center text-[1.1rem] mx-auto font-[600]" onClick={() => dispatch(resetCart())}>Reset Cart</div>
        </div>
      )}

      {products.length > 0 && (
        <div className="mt-10 text-right text-white">
          <h3 className="text-2xl font-bold mb-4">Total: Rs.{totalPrice().toLocaleString()} PKR</h3>
          <Link to={'/checkout'} className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition">
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
