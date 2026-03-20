import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shopifyClient } from '../services/shopify';
import type { ShopifyCheckout, ShopifyVariant } from '../types/shopify';

const CHECKOUT_ID_KEY = 'shopify_checkout_id';

// Helper to fetch or create a checkout
const fetchOrCreateCheckout = async (): Promise<ShopifyCheckout> => {
    let checkoutId = localStorage.getItem(CHECKOUT_ID_KEY);
    let checkout;

    if (checkoutId) {
        try {
            checkout = await shopifyClient.checkout.fetch(checkoutId);
            // If checkout is completed or not found, we create a new one
            if (!checkout || checkout.orderStatusUrl) {
                checkout = await shopifyClient.checkout.create();
            }
        } catch (error) {
            console.error("Error fetching checkout:", error);
            checkout = await shopifyClient.checkout.create();
        }
    } else {
        checkout = await shopifyClient.checkout.create();
    }

    localStorage.setItem(CHECKOUT_ID_KEY, checkout.id as string);
    return JSON.parse(JSON.stringify(checkout)) as ShopifyCheckout;
};

export const useCart = () => {
    const queryClient = useQueryClient();

    // The main Query for the cart state
    const { data: checkout, isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: fetchOrCreateCheckout,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    // Mutations
    const addLineItemMutation = useMutation({
        mutationFn: async ({ variantId, quantity }: { variantId: string; quantity: number }) => {
            if (!checkout?.id) throw new Error("No cart exists");
            const lineItemsToAdd = [{ variantId, quantity }];
            const updatedCheckout = await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);
            return JSON.parse(JSON.stringify(updatedCheckout)) as ShopifyCheckout;
        },
        onSuccess: (updatedCheckout) => {
            queryClient.setQueryData(['cart'], updatedCheckout);
        },
    });

    const removeLineItemMutation = useMutation({
        mutationFn: async (lineItemId: string) => {
            if (!checkout?.id) throw new Error("No cart exists");
            const lineItemIdsToRemove = [lineItemId];
            const updatedCheckout = await shopifyClient.checkout.removeLineItems(checkout.id, lineItemIdsToRemove);
            return JSON.parse(JSON.stringify(updatedCheckout)) as ShopifyCheckout;
        },
        onSuccess: (updatedCheckout) => {
            queryClient.setQueryData(['cart'], updatedCheckout);
        },
    });

    const updateLineItemMutation = useMutation({
        mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
            if (!checkout?.id) throw new Error("No cart exists");
            const lineItemsToUpdate = [{ id, quantity }];
            const updatedCheckout = await shopifyClient.checkout.updateLineItems(checkout.id, lineItemsToUpdate);
            return JSON.parse(JSON.stringify(updatedCheckout)) as ShopifyCheckout;
        },
        onSuccess: (updatedCheckout) => {
            queryClient.setQueryData(['cart'], updatedCheckout);
        },
    });

    // Computed properties
    const cartItems = checkout?.lineItems || [];
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = checkout?.totalPriceV2?.amount ? parseFloat(checkout.totalPriceV2.amount) : 0;
    const subtotalPrice = checkout?.subtotalPriceV2?.amount ? parseFloat(checkout.subtotalPriceV2.amount) : 0;

    return {
        checkout,
        cartItems,
        cartCount,
        cartTotal,
        subtotalPrice,
        checkoutUrl: checkout?.webUrl || '',
        isLoading,
        isAdding: addLineItemMutation.isPending,
        isRemoving: removeLineItemMutation.isPending,
        isUpdating: updateLineItemMutation.isPending,
        addToCart: (variant: ShopifyVariant, quantity: number = 1) => 
            addLineItemMutation.mutate({ variantId: variant.id, quantity }),
        removeFromCart: (lineItemId: string) => 
            removeLineItemMutation.mutate(lineItemId),
        updateQuantity: (lineItemId: string, quantity: number) => 
            updateLineItemMutation.mutate({ id: lineItemId, quantity }),
    };
};
