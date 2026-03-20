import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';

const Header: React.FC = () => {
    const { cartCount, isLoading: isCartLoading } = useCart();
    const navigate = useNavigate();

    return (
        <header className="relative flex justify-center items-center h-24 sticky top-0 bg-white/90 backdrop-blur-sm z-50 ">
            {/* Logo Area */}
            <div 
                id="logo" 
                className="top-2 mt-23 cursor-pointer" 
                onClick={() => navigate('/home')}
            >
                <img src="/Images/Ascension.png" alt="Logo" className="h-110 w-auto max-w-none " />
            </div>

            {/* Cart Button Container */}
            <Link 
                to="/cart"
                className="absolute right-8 flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity z-50 group"
                aria-label={`View your shopping cart with ${cartCount} items`}
            >
                {/* The Shopping Bag Icon */}
                <div className="relative flex items-center justify-center p-2">
                    <FaShoppingBag className="text-xl text-black group-hover:text-gray-700 transition-colors" />
                    
                    {/* The Notification Badge */}
                    <div className="absolute -top-1 -right-1 bg-black text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center text-[10px] font-bold px-1 ring-2 ring-white">
                        {isCartLoading ? '...' : cartCount}
                    </div>
                </div>
                
                {/* Optional Text (Can be hidden on very small screens if desired, but keeping as requested initially) */}
                <span className="hidden sm:inline-block font-bold uppercase tracking-wider">Cart</span>
            </Link>
        </header>
    );
};

export default Header;
