import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { FaArrowLeft } from 'react-icons/fa';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const product = PRODUCTS.find(p => p.id === Number(id));

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
            <header className="flex items-center justify-between px-8 py-8">
                <button
                    onClick={() => navigate('/home')}
                    className="text-xl hover:opacity-70 transition-opacity"
                >
                    <FaArrowLeft />
                </button>
                <div className="text-2xl font-bold tracking-tighter uppercase">
                    BOCH
                </div>
                <div className="w-6"></div> {/* Spacer for centering */}
            </header>

            <main className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12 items-center md:items-start">
                {/* Image Section */}
                <div className="w-full md:w-1/2 flex justify-center bg-gray-50 p-8 rounded-lg">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full max-w-md object-contain drop-shadow-xl"
                    />
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
