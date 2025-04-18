import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../hooks/useFetch";
import { resetCart } from "../redux/CartReducer";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { data } = useFetch("/shipping-charges");
  const shippingCharge = Number(data?.[0]?.charges || 0);
  const products = useSelector((state) => state.cart.products);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate(); // Initialize useNavigate

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += Number(item.price.replace(/,/g, "")) * item.quantity;
    });
    return total + shippingCharge;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits for phone
    if (name === "phone" && /[^\d]/.test(value)) return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, phone, country, city, address } = form;

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.name = "Only letters and spaces allowed";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Invalid email format";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(phone.trim())) {
      newErrors.phone = "Phone must be 11 digits";
    }

    if (!country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
    } else if (address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const orderData = {
      orderData: {
        customerName: form.name.trim(),
        customerEmail: form.email.trim(),
        customerPhoneNumber: form.phone.trim(),
        customerCountry: form.country.trim(),
        customerCity: form.city.trim(),
        shippingAddress: form.address.trim(),
        orderStatus: "pending",
        totalAmount: totalPrice().toString(),
        products: products.map((item) => ({
          product_id: item.id,
          product_name: item.title,
          price: item.price,
          product_description: item.desc,
          quantity: item.quantity,
        })),
      },
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        dispatch(resetCart());
        setForm({
          name: "",
          email: "",
          phone: "",
          country: "",
          city: "",
          address: "",
        }); // Reset form after successful order

        // console.log(res.json());
        

        const result = await res.json(); // Assuming the API returns order data
        // await sendMailToOwner(result.order); // Send email to owner after order placed
  
        // console.log(result.order);
        
        alert("✅ Order placed successfully!");
        navigate("/"); // Navigate to home page
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      alert(`❌ Network error. Please try later. ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">CHECKOUT</h2>

      <form onSubmit={handlePlaceOrder}>
        <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md mb-8">
          <h3 className="text-2xl text-white font-semibold mb-6">Billing Information</h3>

          {[{ label: "Full Name", name: "name", type: "text" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "City", name: "city", type: "text" }]
            .map(({ label, name, type }) => (
              <div className="mb-4" key={name}>
                <label className="text-white font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-xl text-white"
                />
                {errors[name] && <p className="text-red-400 text-sm mt-1">{errors[name]}</p>}
              </div>
            ))}

          <div className="mb-4">
            <label className="text-white font-medium">Country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-xl text-white"
            >
              <option value="">-- Select Country --</option>
              {["Pakistan", "Dubai", "America", "China", "Turkey"].map((c) => (
                <option key={c} value={c} className="text-black">
                  {c}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
          </div>

          <div className="mb-4">
            <label className="text-white font-medium">Shipping Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your shipping address"
              className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-xl text-white"
            />
            {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md mb-8">
          <h3 className="text-2xl text-white font-semibold mb-6">Order Summary</h3>
          {products.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                  <p className="text-gray-400">Rs.{item.price} PKR</p>
                </div>
              </div>
              <span className="text-white font-medium">x {item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between text-white font-medium mt-4">
            <span>Shipping Charges</span>
            <span>Rs.{shippingCharge} PKR</span>
          </div>
          <div className="border-t border-gray-500 mt-4 pt-4">
            <h4 className="text-xl font-semibold text-white">
              Total: Rs.{totalPrice().toLocaleString()} PKR
            </h4>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md mb-8">
          <h3 className="text-2xl text-white font-semibold mb-6">Payment Method</h3>
          <div className="flex items-center space-x-6">
            <label className="text-white flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
          </div>
        </div>

        {/* Complete Order Button */}
        <div className="text-right">
          <button
            type="submit"
            className={`px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition cursor-pointer ${submitting && "opacity-50 cursor-not-allowed"}`}
            disabled={submitting}
          >
            {submitting ? "Processing..." : "Complete Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;


// const sendMailToOwner = async (orderData) => {
//   try {
//     const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/orders/send-email`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ orderData }),
//     });

//     if (!res.ok) {
//       throw new Error("Email not sent");
//     }

//     console.log("✅ Email sent to owner.");
//   } catch (err) {
//     console.error("❌ Email sending failed:", err);
//   }
// };




// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // You can use react-router to navigate if required
// import { useSelector, useDispatch } from "react-redux"
// import useFetch from "../hooks/useFetch";
// import { resetCart } from "../redux/CartReducer";

// const Checkout = () => {

//   const [name,setname] = useState("")
//   const [email,setemail] = useState("")
//   const [phone,setphone] = useState("")
//   const [country,setcountry] = useState("")
//   const [city,setcity] = useState("")
//   const [address,setaddress] = useState("")
  
//   const dispatch = useDispatch();
//   const { data } = useFetch('/shipping-charges')
  
//   const shippingCharge = Number(data && data.length > 0 && data[0].charges);
//   // console.log(data && data.length > 0 && data[0].charges);
//   const products = useSelector(state => state.cart.products)
  
//   const totalPrice = () => {
//     let total = 0;
//     products.forEach((item) => {
//       total += (Number(item.price.replace(/,/g, '')) * item.quantity);
//     });
//     total += shippingCharge;
//     return total;
//   }

//   const [paymentMethod, setPaymentMethod] = useState("cash");

//   const handlePaymentMethodChange = (e) => {
//     setPaymentMethod(e.target.value); // Update payment method based on selection
//   };

//   const handlePlaceOrder = async () => {
   
//     const orderData = {
//       data: {
//         customerName: name,
//         customerEmail: email,
//         customerPhoneNumber: phone,
//         customerCountry: country,
//         customerCity: city,
//         shippingAddress: address,
//         orderStatus: "pending",
//         totalAmount: totalPrice().toString(),
//         products: products.map(item => ({
//           product_id: item.id,
//           product_name: item.title,
//           price: item.price,
//           product_description: item.desc,
//           quantity: item.quantity
//         }))
//       }
//     };
  
//     await fetch(`${import.meta.env.VITE_APP_API_URL}/orders`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(orderData)
//     });

//     dispatch(resetCart());
  
//     alert("Order Placed Successfully!");
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold mb-8 text-white text-center">CHECKOUT</h2>

//       {/* User Information Form */}
//       <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md mb-8">
//         <h3 className="text-2xl text-white font-semibold mb-6">Billing Information</h3>
//         <form>
//           <div className="mb-4">
//             <label className="text-white font-medium">Full Name</label>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-xl text-white" onChange={(e) => setname(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="text-white font-medium">Email Address</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-xl text-white" onChange={(e) => setemail(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="text-white font-medium">Phone Number</label>
//             <input
//               type="tel"
//               placeholder="Enter your phone number"
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-xl text-white" onChange={(e) => setphone(e.target.value)}
//             />
//           </div>
//           {/* Country Dropdown */}
//           <div className="mb-4">
//             <label className="text-white font-medium">Country</label>
//             <select
//               className="w-full mt-2 p-3 cursor-pointer bg-transparent border border-gray-500 rounded-xl text-white" onChange={(e) => setcountry(e.target.value)}
//             >
//               <option value="Pakistan" className="cursor-pointer text-black">Pakistan</option>
//               <option value="Dubai" className="cursor-pointer text-black">Dubai</option>
//               <option value="America" className="cursor-pointer text-black">America</option>
//               <option value="China" className="cursor-pointer text-black">China</option>
//               <option value="Turkey" className="cursor-pointer text-black">Turkey</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="text-white font-medium">City</label>
//             <input
//               type="text"
//               placeholder="Enter your city"
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-xl text-white" onChange={(e) => setcity(e.target.value)}
//             />
//           </div>
//           <div className="mb-4">
//             <label className="text-white font-medium resize-none">Shipping Address</label>
//             <textarea
//               placeholder="Enter your shipping address"
//               className="w-full mt-2 p-3 bg-transparent border border-gray-500 rounded-xl text-white" onChange={(e) => setaddress(e.target.value)}
//             />
//           </div>
//         </form>
//       </div>

//       {/* Order Summary */}
//       <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md mb-8">
//         <h3 className="text-2xl text-white font-semibold mb-6">Order Summary</h3>
//         <div>
//           {products.map((item) => (
//             <div key={item.id} className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   className="w-20 h-20 object-cover rounded-lg"
//                 />
//                 <div>
//                   <h4 className="text-lg font-semibold text-white">{item.title}</h4>
//                   <p className="text-gray-400">Rs.{item.price} PKR</p>
//                 </div>
//               </div>
//               <span className="text-white font-medium">x {item.quantity}</span>
//             </div>
//           ))}
//         </div>

//         {/* Shipping Charge */}
//         <div className="flex justify-between text-white font-medium mt-4">
//           <span>Shipping Charges</span>
//           <span>Rs.{shippingCharge} PKR</span>
//         </div>

//         {/* Total Price */}
//         <div className="border-t border-gray-500 mt-4 pt-4">
//           <h4 className="text-xl font-semibold text-white">Total: Rs.{totalPrice().toLocaleString()} PKR</h4>
//         </div>
//       </div>

//       {/* Payment Method */}
//       <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-md mb-8">
//         <h3 className="text-2xl text-white font-semibold mb-6">Payment Method</h3>
//         <div className="flex items-center space-x-6">
//           <div>
//             <input
//               type="radio"
//               id="cashOnDelivery"
//               name="paymentMethod"
//               value="cash"
//               checked={paymentMethod === "cash"}
//               onChange={handlePaymentMethodChange}
//               className="mr-2"
//             />
//             <label htmlFor="cashOnDelivery" className="text-white">Cash on Delivery</label>
//           </div>
//         </div>
//       </div>

//       {/* Proceed to Payment Button */}
//       <div className="text-right">
//         <Link to="/">
//           <button className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition cursor-pointer" onClick={() => handlePlaceOrder()}>
//             Complete Order
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
