import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import type { ShopifyLineItem } from '../types/shopify';
import { getOptimizedImageUrl } from '../hooks/useProducts';

interface CartItemProps {
    item: ShopifyLineItem;
    onUpdateQuantity: (lineItemId: string, quantity: number) => void;
    onRemove: (lineItemId: string) => void;
    isUpdating: boolean;
    isRemoving: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove, isUpdating, isRemoving }) => {
    const handleIncrement = () => {
        onUpdateQuantity(item.id, item.quantity + 1);
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            onUpdateQuantity(item.id, item.quantity - 1);
        } else {
            onRemove(item.id);
        }
    };

    // Use variant price if available
    const priceAmount = item.variant?.priceV2?.amount ? parseFloat(item.variant.priceV2.amount) : 0;
    const itemTotal = priceAmount * item.quantity;
    
    const imageUrl = item.variant?.image?.src || '';
    const optimizedImage = getOptimizedImageUrl(imageUrl, 200);
    const title = item.title;
    
    const isWorking = isUpdating || isRemoving;

    return (
        <div className={`flex gap-4 p-4 bg-white border border-gray-200 rounded-lg transition-all duration-300 ${isWorking ? 'opacity-50 pointer-events-none' : 'hover:shadow-md'}`}>
            {/* Product Image */}
            <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                {optimizedImage && (
                    <img
                        src={optimizedImage}
                        alt={title}
                        className="w-full h-full object-contain"
                    />
                )}
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg uppercase tracking-wide">{title}</h3>
                    {item.variant?.title !== 'Default Title' && (
                        <p className="text-gray-500 text-sm mb-1">{item.variant?.title}</p>
                    )}
                    <p className="text-gray-600 text-sm">${priceAmount.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                    <button
                        onClick={handleDecrement}
                        disabled={isWorking}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <FaMinus className="text-xs" />
                    </button>
                    <span className="font-semibold text-lg min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                        onClick={handleIncrement}
                        disabled={isWorking}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label="Increase quantity"
                    >
                        <FaPlus className="text-xs" />
                    </button>
                </div>
            </div>

            {/* Price and Remove */}
            <div className="flex flex-col items-end justify-between">
                <button
                    onClick={() => onRemove(item.id)}
                    disabled={isWorking}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
                    aria-label="Remove item"
                >
                    <FaTrash />
                </button>
                <p className="font-bold text-lg">${itemTotal.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default CartItem;
