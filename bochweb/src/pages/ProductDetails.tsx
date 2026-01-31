import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { FaArrowLeft } from 'react-icons/fa';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);
    const [cartCount] = React.useState(0);
    const scrollRef = React.useRef<HTMLDivElement>(null);

    const product = PRODUCTS.find(p => p.id === Number(id));

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

    if (!product) {
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

    return (
        <div className="min-h-screen bg-white text-black font-sans">
            {/* Header */}
            <header className="relative flex justify-center items-center h-24 sticky top-0 bg-white/90 backdrop-blur-sm z-50 ">
                {/* Logo Area */}
                <div id="logo" className="top-2 mt-23  ">
                    <img src="/Images/Ascension.png" alt="Logo" className="h-110 w-auto max-w-none " />
                </div>

                {/* Cart */}
                <div className="absolute right-8 flex items-center gap-2 text-sm font-medium cursor-pointer hover:opacity-70 transition-opacity z-50">
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
                    >
                        {product.images.map((img, index) => (
                            <div
                                key={index}
                                className="min-w-full h-full snap-center flex items-center justify-center p-8"
                            >
                                <img
                                    src={img}
                                    alt={`${product.name} - View ${index + 1}`}
                                    className="w-full h-full object-contain drop-shadow-xl"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Thumbnail Navigation */}
                    {product.images.length > 1 && (
                        <div className="flex justify-center gap-2 mt-4 overflow-x-auto scrollbar-hide py-2">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollToImage(index)}
                                    className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${activeImageIndex === index
                                        ? 'border-black opacity-100'
                                        : 'border-transparent opacity-50 hover:opacity-100'
                                        }`}
                                >
                                    <img
                                        src={img}
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
                        <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide">{product.name}</h1>
                        <p className="text-xl text-gray-600">${product.price.toFixed(2)}</p>
                    </div>

                    <div className="border-t border-b border-gray-200 py-6">
                        <p className="text-gray-800 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {product.soldOut ? (
                            <button
                                disabled
                                className="w-full bg-gray-300 text-gray-500 py-4 font-bold uppercase tracking-widest cursor-not-allowed"
                            >
                                Sold Out
                            </button>
                        ) : (
                            <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;
