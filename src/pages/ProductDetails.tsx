import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProduct, getOptimizedImageUrl } from '../hooks/useProducts';

// HTML parsing helper for Shopify's descriptionHtml
const createMarkup = (html: string) => {
    return { __html: html };
};

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    // React Query Hooks
    const { data: product, isLoading, isError } = useProduct(id);
    const { addToCart, cartCount, isAdding } = useCart();
    
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [isAdded, setIsAdded] = useState(false);

    const scrollToImage = (index: number) => {
        setActiveImageIndex(index);
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            scrollRef.current.scrollTo({
                left: index * width,
                behavior: 'smooth'
            });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            const scrollLeft = scrollRef.current.scrollLeft;
            const index = Math.round(scrollLeft / width);
            setActiveImageIndex(index);
        }
    };

    const handleAddToCart = () => {
        if (product && product.variants && product.variants.length > 0) {
            // Usually, you might have a variant selector. We are defaulting to the first variant
            const selectedVariant = product.variants[0];
            
            addToCart(selectedVariant, 1);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }
    };

    if (isLoading) {
         return (
             <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
             </div>
         );
    }

    if (isError || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <button
                    onClick={() => navigate('/home')}
                    className="text-sm underline hover:opacity-70"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    // Shopify Data Extraction
    // Determine if out of stock
    const isAvailable = product.availableForSale;
    const price = product.variants?.[0]?.priceV2?.amount || '0.00';
    const images = product.images || [];

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            {/* Header */}
            <header className="relative flex justify-center items-center h-24 sticky top-0 bg-white/90 backdrop-blur-sm z-50 ">
                {/* Logo Area */}
                <div id="logo" className="top-2 mt-23 cursor-pointer" onClick={() => navigate('/home')}>
                    <img src="/Images/Ascension.png" alt="Logo" className="h-110 w-auto max-w-none " />
                </div>

                {/* Cart */}
                <div 
                    onClick={() => navigate('/cart')}
                    className="absolute right-8 flex items-center gap-2 text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity z-50"
                >
                    <span>Cart</span>
                    <div className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cartCount}
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12 items-start">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    {/* Main Image Stage */}
                    <div
                        ref={scrollRef}
                        className="w-full aspect-square bg-gray-50 rounded-xl overflow-x-auto snap-x snap-mandatory flex scrollbar-hide"
                        onScroll={handleScroll}
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {images.length > 0 ? images.map((img, index) => (
                            <div
                                key={index}
                                className="min-w-full h-full snap-center flex items-center justify-center p-8 flex-shrink-0"
                            >
                                <img
                                    src={getOptimizedImageUrl(img.src, 1024)}
                                    alt={`${product.title} - View ${index + 1}`}
                                    className="w-full h-full object-contain drop-shadow-xl"
                                />
                            </div>
                        )) : (
                             <div className="min-w-full h-full snap-center flex items-center justify-center p-8 bg-gray-100 flex-shrink-0">
                                 <span className="text-gray-400">No Image</span>
                             </div>
                        )}
                    </div>

                    {/* Thumbnail Navigation */}
                    {images.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4 overflow-x-auto py-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToImage(index)}
                                    className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === index
                                        ? 'border-black opacity-100'
                                        : 'border-transparent opacity-50 hover:opacity-100'
                                        }`}
                                >
                                    <img
                                        src={getOptimizedImageUrl(img.src, 200)}
                                        alt={`Go to slide ${index + 1}`}
                                        className="w-full h-full object-contain"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide">{product.title}</h1>
                        <p className="text-xl text-gray-600">${price}</p>
                    </div>

                    <div className="border-t border-b border-gray-200 py-6">
                        {/* We use dangerouslySetInnerHTML to render Shopify's rich text HTML descriptions safely */}
                        {product.descriptionHtml ? (
                            <div 
                                className="text-gray-800 leading-relaxed prose prose-sm max-w-none prose-a:text-black" 
                                dangerouslySetInnerHTML={createMarkup(product.descriptionHtml)} 
                            />
                        ) : (
                            <p className="text-gray-800 leading-relaxed">
                                {product.description}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        {!isAvailable ? (
                            <button
                                disabled
                                className="w-full bg-gray-300 text-gray-500 py-4 font-bold uppercase tracking-widest cursor-not-allowed"
                            >
                                Sold Out
                            </button>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className={`w-full py-4 font-bold uppercase tracking-widest transition-all duration-300 ${isAdded
                                    ? 'bg-green-600 text-white'
                                    : 'bg-black text-white hover:bg-gray-800 disabled:opacity-75 disabled:cursor-wait'
                                    }`}
                            >
                                {isAdding ? 'Adding...' : isAdded ? '✓ Added to Cart' : 'Add to Cart'}
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;
