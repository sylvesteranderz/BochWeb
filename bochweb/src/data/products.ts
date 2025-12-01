export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    soldOut: boolean;
    description: string;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Silver Rosary I",
        price: 150,
        image: "/Images/product-rosary.png",
        soldOut: true,
        description: "Handcrafted silver rosary with intricate detailing. A timeless piece for your collection."
    },
    {
        id: 2,
        name: "Silver Rosary II",
        price: 150,
        image: "/Images/product-rosary.png",
        soldOut: false,
        description: "Elegant silver rosary featuring a unique cross design. Perfect for daily wear."
    },
    {
        id: 3,
        name: "Black Rosary",
        price: 150,
        image: "/Images/product-rosary.png",
        soldOut: true,
        description: "Matte black finish rosary. Bold, understated, and spiritual."
    },
    {
        id: 4,
        name: "Gold Plated Rosary",
        price: 180,
        image: "/Images/product-rosary.png",
        soldOut: false,
        description: "Premium gold plated rosary. A symbol of faith and luxury."
    },
    {
        id: 5,
        name: "Pearl Rosary",
        price: 200,
        image: "/Images/product-rosary.png",
        soldOut: false,
        description: "Genuine freshwater pearls strung with silver accents."
    },
    {
        id: 6,
        name: "Obsidian Rosary",
        price: 160,
        image: "/Images/product-rosary.png",
        soldOut: false,
        description: "Natural obsidian beads providing a sleek, dark aesthetic."
    }
];
