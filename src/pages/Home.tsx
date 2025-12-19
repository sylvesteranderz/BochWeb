import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

const Home: React.FC = () => {
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleProductClick = (id: number) => {
        navigate(`/product/${id}`);
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            {/* Header */}
            <header className="flex flex-col items-center py-8 gap-4 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
                {/* Logo Area */}
                <div className="text-4xl font-bold tracking-tighter uppercase border-b-2 border-black pb-1">
                    BOCH
                </div>

                {/* Cart */}
                <div
                    onClick={handleCartClick}
                    className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity"
                >
                    <span>Cart</span>
                    <div className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cartCount}
                    </div>
                </div>
            </header>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 lg:gap-24">
                    {PRODUCTS.map((product) => (
                        <div
                            key={product.id}
                            className="group relative flex flex-col items-center cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                        >
                            {/* Image Container */}
                            <div className="relative w-full aspect-square flex items-center justify-center mb-6">
                                {product.soldOut && (
                                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider z-10">
                                        Sold Out
                                    </div>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 ${product.soldOut ? 'opacity-50' : ''}`}
                                />

                                {/* Hover Overlay Text (Optional, adds nice interactivity) */}
                                <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center bg-white/80 px-4 py-2 rounded-full shadow-sm">
                                    <span className="text-sm font-bold uppercase tracking-wider">View Details</span>
                                </div>
                            </div>

                            {/* Minimal Info Below */}
                            <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-sm font-bold uppercase tracking-wide">{product.name}</h3>
                                <p className="text-sm text-gray-500">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
