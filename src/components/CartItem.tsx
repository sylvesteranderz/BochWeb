import React from 'react';
import type { CartItem as CartItemType } from '../context/CartContext';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
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

    const itemTotal = item.price * item.quantity;

    return (
        <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
            {/* Product Image */}
            <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-lg uppercase tracking-wide">{item.name}</h3>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                    <button
                        onClick={handleDecrement}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                        aria-label="Decrease quantity"
                    >
                        <FaMinus className="text-xs" />
                    </button>
                    <span className="font-semibold text-lg min-w-[2rem] text-center">{item.quantity}</span>
                    <button
                        onClick={handleIncrement}
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
