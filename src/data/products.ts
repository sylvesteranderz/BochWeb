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
        name: "Product1",
        price: 150,
        image: "/public/Images/Product1.jpg",
        soldOut: true,
        description: "Handcrafted silver rosary with intricate detailing. A timeless piece for your collection."
    },
    {
        id: 2,
        name: "Product2",
        price: 150,
        image: "/public/Images/Product2.jpg",
        soldOut: false,
        description: "Elegant silver rosary featuring a unique cross design. Perfect for daily wear."
    },
    {
        id: 3,
        name: "Product3",
        price: 150,
        image: "/public/Images/Product3.jpg",
        soldOut: true,
        description: "Matte black finish rosary. Bold, understated, and spiritual."
    },
    {
        id: 4,
        name: "Product4",
        price: 180,
        image: "/public/Images/Product4.jpg",
        soldOut: false,
        description: "Premium gold plated rosary. A symbol of faith and luxury."
    },
    {
        id: 5,
        name: "Product5",
        price: 200,
        image: "/public/Images/Product5.jpg",
        soldOut: false,
        description: "Genuine freshwater pearls strung with silver accents."
    },
    {
        id: 6,
        name: "Product6",
        price: 160,
        image: "public/Images/Product1.jpg",
        soldOut: false,
        description: "Natural obsidian beads providing a sleek, dark aesthetic."
    }   
];
