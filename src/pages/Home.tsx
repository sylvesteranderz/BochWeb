import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts, getOptimizedImageUrl } from '../hooks/useProducts';

const Home: React.FC = () => {
    const { cartCount, isLoading: isCartLoading } = useCart();
    const { data: products, isLoading: isProductsLoading, isError } = useProducts();
    const navigate = useNavigate();

    const handleProductClick = (id: string) => {
        navigate(`/product/${encodeURIComponent(id)}`);
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            {/* Header */}
            <header className="relative flex justify-center items-center h-24 sticky top-0 bg-white/90 backdrop-blur-sm z-50 ">
                {/* Logo Area */}
                <div id="logo" className="top-2 mt-23  ">
                    <img src="/Images/Ascension.png" alt="Logo" className="h-110 w-auto max-w-none " />
                </div>

                {/* Cart */}
                <div
                    onClick={handleCartClick}
                    className="absolute right-8 flex items-center gap-2 text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity z-50"
                >
                    <span>Cart</span>

                    <div className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {isCartLoading ? '...' : cartCount}
                    </div>
                </div>
            </header>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {isProductsLoading ? (
                    <div className="flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-600 py-12">
                        Failed to load products. Please check your connection.
                    </div>
                ) : products?.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        No products found.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-12 lg:gap-24">
                        {products?.map((product) => {
                            const isSoldOut = !product.availableForSale;
                            const mainImage = product.images?.[0]?.src || '';
                            const optimizedImage = getOptimizedImageUrl(mainImage, 600);
                            const price = product.variants?.[0]?.priceV2?.amount || '0.00';
                            
                            return (
                                <div
                                    key={product.id}
                                    className="group relative flex flex-col items-center cursor-pointer"
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-square flex items-center justify-center mb-6">
                                        {isSoldOut && (
                                            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider z-10">
                                                Sold Out
                                            </div>
                                        )}
                                        {optimizedImage && (
                                            <img
                                                src={optimizedImage}
                                                alt={product.title}
                                                className={`w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 ${isSoldOut ? 'opacity-50' : ''}`}
                                            />
                                        )}

                                        {/* Hover Overlay Text */}
                                        <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center bg-white/80 px-4 py-2 rounded-full shadow-sm">
                                            <span className="text-sm font-bold uppercase tracking-wider">View Details</span>
                                        </div>
                                    </div>

                                    {/* Minimal Info Below */}
                                    <div className="text-center mt-4">
                                        <h3 className="text-sm font-bold uppercase tracking-wide">{product.title}</h3>
                                        <p className="text-sm text-gray-500">${price}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;
