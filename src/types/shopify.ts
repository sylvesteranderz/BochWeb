// TypeScript definitions for Shopify Buy SDK objects
// Based on the Storefront API graphQL objects

export interface ShopifyImage {
    id: string;
    src: string;
    altText?: string;
    width?: number;
    height?: number;
}

export interface ShopifyMoneyV2 {
    amount: string;
    currencyCode: string;
}

export interface ShopifyVariant {
    id: string;
    title: string;
    price: ShopifyMoneyV2;
    priceV2: ShopifyMoneyV2; // Older version but often used in SDK
    weight: number;
    available: boolean;
    sku: string;
    image?: ShopifyImage;
    compareAtPrice?: ShopifyMoneyV2;
    compareAtPriceV2?: ShopifyMoneyV2;
    selectedOptions: {
        name: string;
        value: string;
    }[];
}

export interface ShopifyProduct {
    id: string;
    handle: string;
    title: string;
    description: string;
    descriptionHtml: string;
    vendor: string;
    productType: string;
    tags: string[];
    availableForSale: boolean;
    images: ShopifyImage[];
    variants: ShopifyVariant[];
    options: {
        id: string;
        name: string;
        values: { value: string }[];
    }[];
}

export interface ShopifyLineItem {
    id: string;
    title: string;
    quantity: number;
    variant: ShopifyVariant;
    customAttributes: { key: string; value: string }[];
}

export interface ShopifyCheckout {
    id: string;
    webUrl: string;
    lineItems: ShopifyLineItem[];
    subtotalPrice: ShopifyMoneyV2;
    subtotalPriceV2: ShopifyMoneyV2;
    totalTax: ShopifyMoneyV2;
    totalTaxV2: ShopifyMoneyV2;
    totalPrice: ShopifyMoneyV2;
    totalPriceV2: ShopifyMoneyV2;
    currencyCode: string;
    ready: boolean;
}
