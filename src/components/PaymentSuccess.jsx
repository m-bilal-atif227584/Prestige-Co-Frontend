import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const status = queryParams.get("status");
    const orderId = queryParams.get("orderId");

    return (
        <div>
            <h2>Payment {status === "success" ? "Successful" : "Failed"}</h2>
            <p>Order ID: {orderId}</p>
        </div>
    );
};

export default PaymentSuccess;
