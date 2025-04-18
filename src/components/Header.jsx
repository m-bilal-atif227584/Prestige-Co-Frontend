import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import logo2 from '/original.png';
import Scroller from './Scroller';
import { useSelector } from 'react-redux';

function Header() {

    const products = useSelector(state => state.cart.products)
    
    const [scroll, setScroll] = useState(false);
    const [sale, setsale] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleScroll = () => {
        const offsets = window.scrollY;
        setScroll(offsets > 200);
    };

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'; // disable scroll
        } else {
            document.body.style.overflow = 'auto'; // enable scroll again
        }
    
        // Cleanup on unmount (important)
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mobileMenuOpen]);
    

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={`${scroll ? "sticky_nav" : "nav_sec"} bg-black text-white w-full z-50`}>
                <div className='flex items-center justify-between px-4 md:px-12 py-4'>
                    {/* Logo */}
                    <NavLink to={'/'}>
                        <img src={logo2} alt="Logo" className='h-[70px]' />
                    </NavLink>

                    {/* Hamburger */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <IoClose size={30} /> : <GiHamburgerMenu size={30} />}
                        </button>
                    </div>

                    {/* Nav Links (Desktop) */}
                    <div className="hidden md:flex gap-9 items-center">
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>Home</NavLink>

                        <NavLink to="/products/8" className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>New Arrivals</NavLink>

<NavLink to="/products/17" className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>Our Collection</NavLink>

                        {sale && (
                            <NavLink to="/products/10" className={({ isActive }) =>
                                isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                            }>Sale</NavLink>
                        )}

<NavLink to="/products/18" className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>Catalog</NavLink>

                        {/* Men Dropdown */}
                        <div className="relative group">
                            <NavLink to="/products/6" className={({ isActive }) =>
                                isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                            }>Men</NavLink>
                            <div className="absolute hidden group-hover:flex flex-col bg-gray-900 text-white gap-1 top-full p-3 shadow-lg rounded w-[120px] z-50">
                                <NavLink to="/products/11" className="hover:text-[#F4DF8B] text-[0.9rem]">Strap Watches</NavLink>
                                <hr />
                                <NavLink to="/products/12" className="hover:text-[#F4DF8B] text-[0.9rem]">Chain Watches</NavLink>
                            </div>
                        </div>

                        {/* Women Dropdown */}
                        <div className="relative group">
                            <NavLink to="/products/7" className={({ isActive }) =>
                                isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                            }>Women</NavLink>
                            <div className="absolute hidden group-hover:flex flex-col bg-gray-900 gap-1 w-[120px] text-white top-full p-3 shadow-lg rounded z-50">
                                <NavLink to="/products/14" className="hover:text-[#F4DF8B] text-[0.9rem]">Strap Watches</NavLink>
                                <hr />
                                <NavLink to="/products/13" className="hover:text-[#F4DF8B] text-[0.9rem]">Chain Watches</NavLink>
                            </div>
                        </div>

                        {/* Brands Dropdown */}
                        <div className="relative group">
                            <div className="hover:text-[#F4DF8B] duration-200 cursor-pointer">Brands</div>
                            <div className="absolute hidden group-hover:flex flex-col bg-gray-900 gap-1 w-[120px] text-white top-full p-3 shadow-lg rounded z-50">
                                <NavLink to="/products/15" className="hover:text-[#F4DF8B] text-[0.9rem]">Patek Philippe</NavLink>
                                <hr />
                                <NavLink to="/products/16" className="hover:text-[#F4DF8B] text-[0.9rem]">Rolex</NavLink>
                            </div>
                        </div>
                    </div>

                    {/* Search & Cart */}
                    <div className="hidden md:flex gap-5 items-center">
                        <div className="search h-[35px] bg-gray-800 rounded-xl flex px-2 py-1 items-center">
                            <input type="text" className='bg-transparent w-full text-white placeholder:text-white outline-none' placeholder='Search...' />
                            <IoIosSearch className='h-6 w-6' />
                        </div>
                        <NavLink to="/cart" className="relative">
                            <MdOutlineShoppingCart className='h-7 w-7 hover:text-[#F4DF8B] duration-200' />
                            <div className={`bg-[#F4DF8B] text-black h-5 w-5 flex justify-center ${products.length > 0 ? '' : 'hidden'} items-center rounded-full absolute -top-2 -right-2`}>
                                <div className='text-[13px]'>{products.length}</div>
                            </div>
                        </NavLink>
                    </div>
                </div>

                {/* Mobile Menu (Sliding Sidebar) */}
                {/* {mobileMenuOpen && ( */}
                    <div className={`fixed top-0 ${ mobileMenuOpen ? 'right-[0px]' : 'right-[-100vw]'} w-[90vw] h-full bg-black text-white shadow-lg transform transition-all ease-in-out duration-500 z-50`}>
                        <div className="flex justify-end p-6">
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <IoClose size={30} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 p-6">
                        <div className="search h-[35px] bg-gray-800 rounded-xl flex px-2 py-1 items-center">
                            <input type="text" className='bg-transparent w-full text-white placeholder:text-white outline-none' placeholder='Search...' />
                            <IoIosSearch className='h-6 w-6' />
                        </div>
                            <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
                            <NavLink to="/products" onClick={() => setMobileMenuOpen(false)}>New Arrivals</NavLink>
                            {sale && <NavLink to="/category" onClick={() => setMobileMenuOpen(false)}>Sale</NavLink>}

                            <div>
                                <span className="font-bold">Men</span>
                                <div className="ml-4">
                                    <NavLink to="/men/shoes" onClick={() => setMobileMenuOpen(false)}>Shoes</NavLink><br />
                                    <NavLink to="/men/clothing" onClick={() => setMobileMenuOpen(false)}>Clothing</NavLink>
                                </div>
                            </div>

                            <div>
                                <span className="font-bold">Women</span>
                                <div className="ml-4">
                                    <NavLink to="/women/shoes" onClick={() => setMobileMenuOpen(false)}>Shoes</NavLink><br />
                                    <NavLink to="/women/clothing" onClick={() => setMobileMenuOpen(false)}>Clothing</NavLink>
                                </div>
                            </div>

                            <div>
                                <span className="font-bold">Brands</span>
                                <div className="ml-4">
                                    <NavLink to="/brands/nike" onClick={() => setMobileMenuOpen(false)}>Patek Philippe</NavLink><br />
                                    <NavLink to="/brands/adidas" onClick={() => setMobileMenuOpen(false)}>Rolex</NavLink>
                                </div>
                            </div>

                            <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)}>Cart</NavLink>
                        </div>
                    </div>
                {/* )} */}
            </div>

            <Scroller />
        </>
    );
}

export default Header;



// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router'
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { IoIosSearch } from "react-icons/io";
// import logo2 from '../assets/logo2.png'
// import Scroller from './Scroller';

// function Header() {

//     const [scroll, setScroll] = useState(false)
//     const [sale, setsale] = useState(false)

//     const handleScroll = () => {
//         const offsets = window.scrollY;
//         if (offsets > 200) {
//             setScroll(true);
//         }
//         else {
//             setScroll(false);
//         }
//     }
//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll)
//     }, [])

//     return (
//         <>
//             <div className={`${scroll ? "sticky_nav" : "nav_sec"} bg-black text-white w-full`} >
//                 <div className='flex items-center justify-around'>
//                     <NavLink to={'/'}>
//                         <img src={logo2} alt="" className='h-[95px]' />
//                     </NavLink>
//                     <div className="flex gap-9">
//                         <NavLink to={'/'} className={({ isActive }) =>
//                             isActive ? "text-[#F4DF8B] font-[700] text-[19px] hover:text-[#F4DF8B] duration-200" : "text-white font-[600] text-[19px] hover:text-[#F4DF8B] duration-200"
//                         }>Home</NavLink>
//                         <NavLink to={'/products'} className={({ isActive }) =>
//                             isActive ? "text-[#F4DF8B] font-[700] text-[19px] hover:text-[#F4DF8B] duration-200" : "text-white font-[600] text-[19px] hover:text-[#F4DF8B] duration-200"
//                         }>New Arrivals</NavLink>
//                         {sale && <NavLink to={'/category'} className={({ isActive }) =>
//                             isActive ? "text-[#F4DF8B] font-[700] text-[19px] hover:text-[#F4DF8B] duration-200" : "text-white font-[600] text-[19px] hover:text-[#F4DF8B] duration-200"
//                         }>Sale</NavLink>}
//                         <NavLink to={'/aboutus'} className={({ isActive }) =>
//                             isActive ? "text-[#F4DF8B] font-[700] text-[19px] hover:text-[#F4DF8B] duration-200" : "text-white font-[600] text-[19px] hover:text-[#F4DF8B] duration-200"
//                         }>Men</NavLink>
//                         <NavLink to={'/contact'} className={({ isActive }) =>
//                             isActive ? "text-[#F4DF8B] font-[700] text-[19px] hover:text-[#F4DF8B] duration-200" : "text-white font-[600] text-[19px] hover:text-[#F4DF8B] duration-200"
//                         }>Women</NavLink>
//                         <NavLink to={'/contact'} className={({ isActive }) =>
//                             isActive ? "text-[#F4DF8B] font-[700] text-[19px] hover:text-[#F4DF8B] duration-200" : "text-white font-[600] text-[19px] hover:text-[#F4DF8B] duration-200"
//                         }>Brands</NavLink>
//                     </div>
//                     <div className="flex gap-5 justify-center items-center">
//                         <div className="search h-[35px] rounded-xl flex px-2 py-1 items-center">
//                             <input type="text" className='w-full text-white placeholder:text-white outline-none' placeholder='Search...' />
//                             <IoIosSearch className='h-7 w-7' />
//                         </div>
//                         <NavLink to={'/cart'}>
//                             <MdOutlineShoppingCart className='h-7 cursor-pointer mt-5 ml-[-7px] w-7 hover:text-[#F4DF8B] duration-200' />
//                             <div className="bg-[#F4DF8B] text-black h-5 w-5 flex justify-center items-center rounded-full relative top-[-36px] right-[-15px]">
//                                 <div className='text-[13px]'>5</div>
//                             </div>
//                         </NavLink>
//                     </div>
//                 </div>
//             </div>
//             <Scroller />
//         </>
//     )
// }

// export default Header