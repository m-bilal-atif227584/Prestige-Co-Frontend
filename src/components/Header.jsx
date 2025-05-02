import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import logo2 from '/original.png';
import Scroller from './Scroller';
import { useSelector } from 'react-redux';

function Header(DATA) {

    const d = DATA.DATA

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const products = useSelector(state => state.cart.products)
    const sale = useSelector(state => state.sale.isSale);
    const [scroll, setScroll] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchshow, setsearchshow] = useState(true)

    const handleSearchChange = (e) => {

        setsearchshow(true)
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setFilteredResults([]);
            return;
        }

        const results = d.filter(item =>
            item.title && item.title.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredResults(results);
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

        const handleScroll = () => {
            const offsets = window.scrollY;
            if (offsets > 200) {
              setScroll(true);
            } else {
              setScroll(false); // <- important!!
            }
          };
              
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className={`${scroll ? "sticky_nav" : "nav_sec"} bg-black text-white w-full z-50`}>
                <div className='flex items-center justify-between px-4 xl:px-12 sm:py-4 py-1.5'>
                    {/* Logo */}
                    <NavLink to={'/'}>
                        <img src={logo2} alt="Logo" className='h-[70px]' />
                    </NavLink>

                    {/* Hamburger */}
                    <div className="xl:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <IoClose size={30} /> : <GiHamburgerMenu size={30} />}
                        </button>
                    </div>

                    {/* Nav Links (Desktop) */}
                    <div className="hidden xl:flex gap-9 items-center">
                        <NavLink to="/" className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>Home</NavLink>

                        <NavLink to="/products/8" className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>New Arrivals</NavLink>

                        <NavLink to="/products/17" className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>Our Collection</NavLink>

                        {sale &&
                            <NavLink to="/products/10" className={({ isActive }) =>
                                isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                            }>Sale</NavLink>
                        }

                        {/* <NavLink to="/products/18" className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>Catalog</NavLink> */}

                        {/* Men Dropdown */}
                        <div className="relative group">
                            <NavLink to="/products/6" className={({ isActive }) =>
                                isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                            }>Men</NavLink>
                            <div className="absolute hidden group-hover:flex flex-col bg-gray-900 text-white gap-1 top-full p-3 shadow-lg rounded w-[120px] z-50">
                                <NavLink to="/products/11" className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] text-[0.88rem]" : "hover:text-[#F4DF8B] duration-200 text-[0.88rem]"
                                }>Strap Watches</NavLink>
                                <hr />
                                <NavLink to="/products/12" className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] text-[0.88rem]" : "hover:text-[#F4DF8B] duration-200 text-[0.88rem]"
                                }>Chain Watches</NavLink>
                            </div>
                        </div>

                        {/* Women Dropdown */}
                        <div className="relative group">
                            <NavLink to="/products/7" className={({ isActive }) =>
                                isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                            }>Women</NavLink>
                            <div className="absolute hidden group-hover:flex flex-col bg-gray-900 gap-1 w-[120px] text-white top-full p-3 shadow-lg rounded z-50">
                                <NavLink to="/products/14" className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] text-[0.88rem]" : "hover:text-[#F4DF8B] duration-200 text-[0.88rem]"
                                }>Strap Watches</NavLink>
                                <hr />
                                <NavLink to="/products/13" className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] text-[0.88rem]" : "hover:text-[#F4DF8B] duration-200 text-[0.88rem]"
                                }>Chain Watches</NavLink>
                            </div>
                        </div>

                        {/* Brands Dropdown */}
                        <div className="relative group">
                            <div className="hover:text-[#F4DF8B] duration-200 cursor-pointer">Brands</div>
                            <div className="absolute hidden group-hover:flex flex-col bg-gray-900 gap-1 w-[120px] text-white top-full p-3 shadow-lg rounded z-50">
                                <NavLink to="/products/15" className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] text-[0.88rem] font-bold" : "hover:text-[#F4DF8B] duration-200 text-[0.88rem]"
                                }>Patek Philippe</NavLink>
                                <hr />
                                <NavLink to="/products/16" className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] text-[0.88rem] font-bold" : "hover:text-[#F4DF8B] duration-200 text-[0.88rem]"
                                }>Rolex</NavLink>
                            </div>
                        </div>
                    </div>

                    {/* Search & Cart */}
                    <div className="hidden xl:flex gap-5 items-center">
                        <div className="search h-[35px] bg-gray-800 rounded-xl flex px-2 py-1 items-center">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className='bg-transparent w-full text-white placeholder:text-white outline-none'
                                placeholder='Search...'
                            />
                            <IoIosSearch className='h-6 w-6' />
                        </div>
                        <NavLink to="/cart" className="relative">
                            <MdOutlineShoppingCart className='h-7 w-7 hover:text-[#F4DF8B] duration-200' />
                            <div className={`bg-[#F4DF8B] text-black h-5 w-5 flex justify-center ${products.length > 0 ? '' : 'hidden'} items-center rounded-full absolute -top-2 -right-2`}>
                                <div className='text-[13px]'>{products.length}</div>
                            </div>
                        </NavLink>
                    </div>
                    {searchQuery && filteredResults.length > 0 && (
                        <div className={`absolute sm:top-16 mt-2 sm:block top-[107px] right-[1.8rem] sm:right-24 sm:w-[220px] w-[75.8%] bg-gray-500 text-black shadow-lg sm:z-50 z-[100] rounded-lg max-h-64 overflow-y-auto ${searchshow ? '' : 'hidden'}`}>
                            {filteredResults.map(item => (
                                <Link to={`/product/${item.id}`} key={item.id} className="flex items-center gap-2 px-2 py-2 border-b hover:bg-gray-600 duration-200 cursor-pointer" onClick={() => { setsearchshow(false); setSearchQuery(''); setMobileMenuOpen(false) }}>
                                    <img src={item.img1} alt={item.title} className="w-10 h-10 object-cover rounded" />
                                    <span className='text-[0.9rem]' >{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Mobile Menu (Sliding Sidebar) */}
                {/* {mobileMenuOpen && ( */}
                <div className={`fixed top-0 ${mobileMenuOpen ? 'right-[0px]' : 'right-[-100vw]'} w-[90vw] h-[100vh] bg-black text-white shadow-lg transform transition-all ease-in-out duration-500 z-50`}>
                    <div className="flex justify-end p-6">
                        <button onClick={() => { setMobileMenuOpen(false); setsearchshow(false) }}>
                            <IoClose size={30} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 overflow-y-auto px-6">
                        <div className="search h-[35px] bg-gray-800 rounded-xl flex px-2 py-1 items-center">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className='bg-transparent w-full text-white placeholder:text-white outline-none'
                                placeholder='Search...'
                            />
                            <IoIosSearch className='h-6 w-6' />
                        </div>
                        <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>Home</NavLink>
                        <NavLink to="/products/8" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>New Arrivals</NavLink>
                        <NavLink to="/products/17" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>Our Collection</NavLink>
                        {sale && <NavLink to="/products/10" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                        }>Sale</NavLink>}
                        {/* <NavLink to="/products/18" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                            isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200" */}
                        {/* }>Catalog</NavLink> */}

                        <div>
                            <NavLink to={'/products/6'} className={({ isActive }) =>
                                isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                            } onClick={() => setMobileMenuOpen(false)} >Men</NavLink>
                            <div className="ml-4">
                                <NavLink to="/products/11" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                                }>Strap Watches</NavLink><br />
                                <NavLink to="/products/12" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                                }>Chain Watches</NavLink>
                            </div>
                        </div>

                        <div>
                            <NavLink to={'/products/7'} className={({ isActive }) =>
                                isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                            } onClick={() => setMobileMenuOpen(false)}>Women</NavLink>
                            <div className="ml-4">
                                <NavLink to="/products/14" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                                }>Strap Watches</NavLink><br />
                                <NavLink to="/products/13" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                                }>Chain Watches</NavLink>
                            </div>
                        </div>

                        <div>
                            <span>Brands</span>
                            <div className="ml-4">
                                <NavLink to="/products/15" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                                }>Patek Philippe</NavLink><br />
                                <NavLink to="/products/16" onClick={() => setMobileMenuOpen(false)} className={({ isActive }) =>
                                    isActive ? "text-[#F4DF8B] font-bold" : "hover:text-[#F4DF8B] duration-200"
                                }>Rolex</NavLink>
                            </div>
                        </div>
                        <NavLink to="/cart" className="relative" onClick={() => setMobileMenuOpen(false)}>
                            <div className="flex items-center gap-2 mt-4">
                                <MdOutlineShoppingCart className='h-6 w-6 hover:text-[#F4DF8B] duration-200' />
                                <span>Cart</span>
                                {products.length > 0 && (
                                    <div className="bg-[#F4DF8B] text-black h-5 w-5 flex justify-center items-center rounded-full text-[13px]">
                                        {products.length}
                                    </div>
                                )}
                            </div>
                        </NavLink>
                    </div>
                </div>
                {/* )} */}
            </div>

            <Scroller />
        </>
    );
}

export default Header;
