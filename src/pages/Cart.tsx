import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { FaArrowLeft, FaShoppingBag } from 'react-icons/fa';

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();

    return (
        <div className="min-h-screen bg-gray-50 text-black font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-2 text-lg hover:opacity-70 transition-opacity"
                    >
                        <FaArrowLeft />
                        <span className="hidden sm:inline">Continue Shopping</span>
                    </button>
                    <div className="text-2xl font-bold tracking-tighter uppercase">
                        BOCH
                    </div>
                    <div className="w-24"></div> {/* Spacer for centering */}
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold mb-8 uppercase tracking-wide">
                    Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </h1>

                {cartItems.length === 0 ? (
                    // Empty Cart State
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <FaShoppingBag className="text-6xl text-gray-300 mb-4" />
                        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-6">Add some beautiful rosaries to get started</p>
                        <button
                            onClick={() => navigate('/home')}
                            className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                        >
                            Shop Now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>

                        {/* Cart Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
                                <h2 className="text-xl font-bold mb-4 uppercase tracking-wide">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>Calculated at checkout</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors mb-3">
                                    Checkout
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="w-full bg-white text-red-600 border border-red-600 py-3 font-semibold uppercase tracking-wide hover:bg-red-50 transition-colors"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cart;
