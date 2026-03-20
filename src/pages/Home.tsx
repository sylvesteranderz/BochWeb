import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import Header from '../components/Header';
import AddedToCartModal from '../components/AddedToCartModal';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
    const { data: products, isLoading: isProductsLoading, isError } = useProducts();
    const { addToCart } = useCart();

    // State for Quick Add Confirmation Modal
    const [showCartModal, setShowCartModal] = useState(false);
    const [addedProduct, setAddedProduct] = useState<any>(null);

    const handleQuickAdd = (e: React.MouseEvent, product: any) => {
        // Stop the Link click event from firing context navigation
        e.preventDefault();
        e.stopPropagation();

        if (product && product.variants && product.variants.length > 0) {
            const selectedVariant = product.variants[0];
            addToCart(selectedVariant, 1);
            setAddedProduct(product);
            setShowCartModal(true);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans relative">
            <Header />

            {/* Product Grid - Full Bleed Portrait Style */}
            <main className="max-w-[1800px] w-full mx-auto px-1 sm:px-2 pb-12 pt-4">
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
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2">
                        {products?.map((product) => {
                            return (
                                <ProductCard 
                                    key={product.id}
                                    product={product}
                                    onQuickAdd={(p: any) => handleQuickAdd({ preventDefault: () => {}, stopPropagation: () => {} } as any, p)}
                                />
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Global Success Modal triggered by Quick Add */}
            <AddedToCartModal 
                isOpen={showCartModal}
                onClose={() => setShowCartModal(false)}
                itemTitle={addedProduct?.title || ''}
                variant={addedProduct?.variants?.[0] || null}
            />
        </div>
    );
};

export default Home;
