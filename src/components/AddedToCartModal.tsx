import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ShopifyVariant } from '../types/shopify';
import { getOptimizedImageUrl } from '../hooks/useProducts';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

interface AddedToCartModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemTitle: string;
    variant: ShopifyVariant | null;
}

const AddedToCartModal: React.FC<AddedToCartModalProps> = ({ 
    isOpen, 
    onClose, 
    itemTitle, 
    variant 
}) => {
    const navigate = useNavigate();

    if (!isOpen || !variant) return null;

    const imageUrl = variant?.image?.src || '';
    const optimizedImage = getOptimizedImageUrl(imageUrl, 300);
    const price = variant?.priceV2?.amount ? parseFloat(variant.priceV2.amount).toFixed(2) : '0.00';
    const variantTitle = variant.title !== 'Default Title' ? variant.title : '';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop overlay */}
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                >
                    <FaTimes size={20} />
                </button>

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
                    <FaCheckCircle className="text-green-500 text-4xl mb-3" />
                    <h2 className="text-2xl font-bold tracking-tight">Added to Cart!</h2>
                    <p className="text-gray-500 text-sm mt-1">Item successfully placed in your shopping cart.</p>
                </div>

                {/* Product Preview */}
                <div className="p-6 bg-gray-50 flex items-center gap-4">
                    <div className="w-20 h-20 bg-white rounded-md object-contain border border-gray-200 overflow-hidden flex-shrink-0">
                        {optimizedImage ? (
                             <img src={optimizedImage} alt={itemTitle} className="w-full h-full object-contain p-2" />
                        ) : (
                             <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                 <span className="text-xs text-gray-400">No Image</span>
                             </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 leading-tight uppercase tracking-wider text-sm">{itemTitle}</h3>
                        {variantTitle && <p className="text-gray-500 text-xs mt-1">{variantTitle}</p>}
                        <p className="text-black font-semibold mt-1">${price}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 flex flex-col gap-3">
                    <button 
                        onClick={() => {
                            onClose();
                            navigate('/cart');
                        }}
                        className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg shadow-black/20"
                    >
                        View Cart & Checkout
                    </button>
                    
                    <button 
                        onClick={() => {
                            onClose();
                            navigate('/home');
                        }}
                        className="w-full bg-white text-black border-2 border-black py-3.5 font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddedToCartModal;
