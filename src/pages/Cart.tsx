import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/CartItem';
import { FaShoppingBag } from 'react-icons/fa';
import Header from '../components/Header';

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { 
        cartItems, 
        updateQuantity, 
        removeFromCart, 
        cartCount, 
        subtotalPrice, 
        checkoutUrl,
        isLoading,
        isUpdating,
        isRemoving
    } = useCart();

    const handleCheckout = () => {
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-black font-sans">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold mb-8 uppercase tracking-wide flex items-center gap-3">
                    Shopping Cart {cartCount > 0 ? `(${cartCount} ${cartCount === 1 ? 'item' : 'items'})` : ''}
                    {isLoading && <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-black inline-block ml-4"></span>}
                </h1>

                {isLoading && cartItems.length === 0 ? (
                      <div className="flex justify-center items-center py-20">
                          <p className="text-gray-500">Loading your cart...</p>
                      </div>
                ) : cartItems.length === 0 ? (
                    // Empty Cart State
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-lg shadow-sm">
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
                                    isUpdating={isUpdating}
                                    isRemoving={isRemoving}
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
                                        <span>${subtotalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Taxes and Shipping</span>
                                        <span className="text-sm">Calculated at checkout</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                                        <span>Estimated Total</span>
                                        <span>${subtotalPrice.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    disabled={!checkoutUrl || cartItems.length === 0}
                                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Proceed to Checkout
                                </button>
                                
                                <p className="text-xs text-center text-gray-500 mt-4">Safe and secure checkout powered by Shopify.</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cart;
