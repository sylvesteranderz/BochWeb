import Client from 'shopify-buy';

const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!domain || !storefrontAccessToken) {
    console.error('Shopify configuration is missing. Please check your .env.local file. ' +
        'Expected VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN');
}

export const shopifyClient = Client.buildClient({
    domain: domain || 'example.myshopify.com', 
    storefrontAccessToken: storefrontAccessToken || 'dummy-token',
    apiVersion: '2024-01' // Use standard API version
});
