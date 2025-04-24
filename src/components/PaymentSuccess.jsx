import React from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function Success() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  return orderId ? (
    <div className="min-h-[480px] flex items-center justify-center bg-black px-4">
      <div className="bg-zinc-900 border border-white my-10 shadow-xl rounded-2xl p-8 md:p-12 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-500 w-16 h-16" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-extrabold text-green-500 mb-2">Order Confirmed!</h1>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
        </p>

            <div className="text-sm text-gray-400 mb-2">
              <span className="font-medium text-white">Order ID:</span> {orderId}
            </div>
            <p className="text-xs text-yellow-400 bg-yellow-900/30 px-4 py-2 rounded-lg mb-6">
  ⚠️ Please make sure to save or take a screenshot of your Order ID. It may be needed later for leaving a review.
</p>

        <button
          onClick={() => window.location.href = "/"}
          className="bg-green-600 text-white font-medium cursor-pointer px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  ) : (<div className="min-h-[480px]"></div>);
}

export default Success;
