import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProduct, useProducts, getOptimizedImageUrl } from '../hooks/useProducts';
import AddedToCartModal from '../components/AddedToCartModal';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { BsBagPlus } from 'react-icons/bs';

// HTML parsing helper for Shopify's descriptionHtml
const createMarkup = (html: string) => {
    return { __html: html };
};

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    // React Query Hooks
    const { data: product, isLoading, isError } = useProduct(id);
    const { data: allProducts } = useProducts();
    const { addToCart, isAdding } = useCart();
    
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [addedProduct, setAddedProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);

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
            
            addToCart(selectedVariant, quantity);
            setAddedProduct(product);
            setShowCartModal(true);
        }
    };

    const handleBuyItNow = () => {
        if (product && product.variants && product.variants.length > 0) {
            const selectedVariant = product.variants[0];
            
            // Add to cart and immediately route to checkout page
            addToCart(selectedVariant, quantity);
            navigate('/cart');
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

    // Filter related products for recommendations section
    const recommendations = allProducts?.filter(p => p.id !== product.id).slice(0, 4) || [];

    return (
        <div className="min-h-screen bg-white text-black font-sans relative">
            <Header />

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
                <div className="w-full md:w-1/2 flex flex-col gap-6 pr-4">
                    <div>
                        <h1 className="text-[2.5rem] leading-[1.1] font-bold mb-3 tracking-tight text-gray-900">{product.title}</h1>
                        <p className="text-[1.3rem] text-gray-700">GH₵{price}</p>
                    </div>

                    <div className="w-full h-px bg-gray-100 my-2"></div>

                    <div className="flex flex-col gap-3">
                        {!isAvailable ? (
                            <button
                                disabled
                                className="w-full bg-gray-200 text-gray-500 rounded-2xl py-4 font-semibold cursor-not-allowed"
                            >
                                Sold Out
                            </button>
                        ) : (
                            <>
                                {/* Row: Quantity & Add to Cart */}
                                <div className="flex items-stretch gap-3 h-[52px]">
                                    {/* Quantity Selector */}
                                    <div className="flex items-center justify-between border border-gray-200 rounded-2xl w-1/3 sm:w-32 flex-shrink-0 bg-white shadow-sm overflow-hidden">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="h-full w-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                                            aria-label="Decrease quantity"
                                        >−</button>
                                        <span className="font-medium text-lg min-w-[20px] text-center">{quantity}</span>
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="h-full w-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                                            aria-label="Increase quantity"
                                        >+</button>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isAdding}
                                        className={`flex-1 flex justify-center items-center gap-2 rounded-2xl font-semibold transition-all shadow-sm ${isAdding ? 'bg-black/80 text-white cursor-wait' : 'bg-[#0a0a0a] text-white hover:scale-[1.02] active:scale-[0.98]'}`}
                                    >
                                        {isAdding ? (
                                            'Adding...'
                                        ) : (
                                            <>
                                                <BsBagPlus className="text-xl" />
                                                <span className="text-[15px]">Add to cart</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Row: Buy it now */}
                                <button
                                    onClick={handleBuyItNow}
                                    disabled={isAdding}
                                    className="w-full h-[52px] bg-black text-white rounded-2xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] mt-1"
                                >
                                    Buy it now
                                </button>
                            </>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mt-8">
                        {product.descriptionHtml ? (
                            <div 
                                className="text-gray-600 leading-relaxed prose prose-sm max-w-none prose-a:text-black" 
                                dangerouslySetInnerHTML={createMarkup(product.descriptionHtml)} 
                            />
                        ) : (
                            <p className="text-gray-600 leading-relaxed text-[15px]">
                                {product.description}
                            </p>
                        )}
                    </div>
                </div>
            </main>

            {/* You May Also Like Section */}
            {recommendations.length > 0 && (
                <section className="max-w-[1800px] w-full mx-auto px-1 sm:px-2 pb-16 pt-12 mt-8">
                    <h2 className="text-3xl font-extrabold mb-6 px-3 tracking-tight text-gray-900">You may also like</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2">
                        {recommendations.map(recProduct => (
                            <ProductCard 
                                key={recProduct.id} 
                                product={recProduct} 
                                onQuickAdd={(p: any) => {
                                    if (p && p.variants && p.variants.length > 0) {
                                        addToCart(p.variants[0], 1);
                                        setAddedProduct(p);
                                        setShowCartModal(true);
                                    }
                                }} 
                            />
                        ))}
                    </div>
                </section>
            )}

            <AddedToCartModal 
                isOpen={showCartModal}
                onClose={() => setShowCartModal(false)}
                itemTitle={addedProduct?.title || ''}
                variant={addedProduct?.variants?.[0] || null}
            />
        </div>
    );
};

export default ProductDetails;
