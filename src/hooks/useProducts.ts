import { useQuery } from '@tanstack/react-query';
import { shopifyClient } from '../services/shopify';
import type { ShopifyProduct } from '../types/shopify';

// Helper to use Shopify's Image CDN for optimized images
export const getOptimizedImageUrl = (url: string, width: number = 800) => {
    if (!url) return '';
    // If it's already a shopify CDN url, we can append width params, but shopify-buy 
    // already gives us high-res URLs in most cases. Modern approach:
    try {
        const urlObj = new URL(url);
        // Only modify if it's a shopify cdn
        if (urlObj.hostname.includes('cdn.shopify.com')) {
            // Very simple replacement for shopify CDN (removing existing sizing and adding new)
            // Example: /something_1024x1024.jpg -> /something_800x.jpg
            const pathParts = urlObj.pathname.split('.');
            if (pathParts.length > 1) {
                const ext = pathParts.pop();
                let basename = pathParts.join('.');
                // remove existing _500x500 or _small suffixes if they exist
                basename = basename.replace(/_[0-9]+x[0-9]*$/, '').replace(/_small$/, '');
                urlObj.pathname = `${basename}_${width}x.${ext}`;
            }
        }
        return urlObj.toString();
    } catch {
        return url;
    }
}

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async (): Promise<ShopifyProduct[]> => {
            // Using shopify-buy to fetch all products
            const products = await shopifyClient.product.fetchAll();
            // The shopify-buy SDK returns a complex object, we type it roughly as our interface
            return JSON.parse(JSON.stringify(products)) as ShopifyProduct[];
        },
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};

export const useProduct = (id: string | undefined) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: async (): Promise<ShopifyProduct | null> => {
            if (!id) return null;
            
            // To fetch a single product, shopify-buy uses GraphQL IDs (gid://shopify/Product/...)
            // Since our old app used numbers, we'll try to find it by ID if it's a GID, 
            // or we'll fetch all and filter finding the matching handle or ID if we mapped them.
            // But with Shopify Storefront API, we should use the actual GID. 
            // If `id` doesn't start with gid://, we'll assume it's just a raw number ID or we will just use `fetchByHandle`.
            // For resilience against the old integer IDs, we can fetch all and find:
            if (!id.startsWith('gid://')) {
                const products = await shopifyClient.product.fetchAll();
                // Match by handle instead if we want robust routing, or fallback to index/id
                // Since this is migrating from hardcoded ID = 1, 2...
                // We'll return the product at that index for backward compatibility during transition, or null
                let numericId = parseInt(id, 10);
                if (!isNaN(numericId) && numericId > 0 && numericId <= products.length) {
                    return JSON.parse(JSON.stringify(products[numericId - 1])) as ShopifyProduct;
                }
                
                // If we know it's a handle:
                try {
                     const p = await shopifyClient.product.fetchByHandle(id);
                     if (p) return JSON.parse(JSON.stringify(p)) as ShopifyProduct;
                } catch {
                     // fall through
                }
                return null;
            }

            const product = await shopifyClient.product.fetch(id);
            return JSON.parse(JSON.stringify(product)) as ShopifyProduct;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};
