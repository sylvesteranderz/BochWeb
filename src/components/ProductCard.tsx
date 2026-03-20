import React from 'react';
import { Link } from 'react-router-dom';
import { getOptimizedImageUrl } from '../hooks/useProducts';
import { BsBagPlus } from 'react-icons/bs';

interface ProductCardProps {
    product: any;
    onQuickAdd: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd }) => {
    const isSoldOut = !product.availableForSale;
    const mainImage = product.images?.[0]?.src || '';
    const optimizedImage = getOptimizedImageUrl(mainImage, 800);
    
    // Check for secondary image to enable hover crossfade
    const secondaryImage = product.images?.[1]?.src;
    const optimizedHoverImage = secondaryImage ? getOptimizedImageUrl(secondaryImage, 800) : null;
    const hasHoverImg = !!optimizedHoverImage;

    const price = product.variants?.[0]?.priceV2?.amount || '0.00';

    return (
        <div className="group relative flex flex-col h-full bg-white">
            {/* Absolute Click Overlay - Guarantees 100% click area across the entire card */}
            <Link 
                to={`/product/${encodeURIComponent(product.id)}`}
                className="absolute inset-0 z-20"
                aria-label={`View details for ${product.title}`}
            />

            {/* Image Container with strict portrait bounds and edge-to-edge cover */}
            <div className="relative w-full aspect-[4/5] flex items-center justify-center bg-gray-100 overflow-hidden shrink-0">
                {isSoldOut && (
                    <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider z-10">
                        Sold Out
                    </div>
                )}
                
                {/* CSS Pre-rendered Hover Image */}
                {hasHoverImg && (
                    <img
                        src={optimizedHoverImage}
                        alt={`${product.title} alternative view`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 ${isSoldOut ? 'scale-100' : 'group-hover:scale-105'}`}
                    />
                )}

                {/* Primary Base Image */}
                {optimizedImage && (
                    <img
                        src={optimizedImage}
                        alt={product.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hasHoverImg ? 'group-hover:opacity-0' : ''} ${isSoldOut ? 'opacity-50 group-hover:opacity-50' : 'group-hover:scale-105'}`}
                    />
                )}

                {/* Quick Add Button Overlay (Sits highest in z-index to avoid Link absorption) */}
                {!isSoldOut && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onQuickAdd(product);
                        }}
                        className="group/btn absolute bottom-3 right-3 z-30 flex items-center justify-center bg-white text-black h-11 px-[11px] rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-y-2 md:group-hover:translate-y-0 hover:scale-105 active:scale-95"
                        aria-label={`Quick add ${product.title} to Cart`}
                    >
                        <BsBagPlus className="text-[22px] shrink-0" />
                        <span className="overflow-hidden whitespace-nowrap transition-all duration-300 ease-out max-w-0 opacity-0 group-hover/btn:max-w-[60px] group-hover/btn:opacity-100 group-hover/btn:ml-2 font-medium text-[15px]">
                            Add
                        </span>
                    </button>
                )}
            </div>

            {/* Minimal Info Below, Left Aligned */}
            <div className="text-left mt-2 flex flex-col justify-start w-full px-1">
                <h3 className="text-xs sm:text-sm text-gray-900 line-clamp-2">{product.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">GH₵{price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
