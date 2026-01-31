export interface Product {
        id: number;
        name: string;
        price: number;
        images: string[];
        soldOut: boolean;
        description: string;
}

export const PRODUCTS: Product[] = [
        {
                id: 1,
                name: "SONOFBOCH ASCENSION POLO RED",
                price: 150,
                images: [
                        "/Images/SOBRed1.jpeg",
                        "/Images/SOBRed.jpeg",
                        "/Images/SOBRed2.jpeg",
                        "/Images/SOBRed3.jpeg",
                        "/Images/SOBRed6.jpeg"
                ],
                soldOut: false,
                description: "Handcrafted silver rosary with intricate detailing. A timeless piece for your collection."
        },
        {
                id: 2,
                name: "SONOFBOCH ASCENSION POLO BLACK",
                price: 150,
                images: [
                        "/Images/BlackPolo1.jpeg",
                        "/Images/BlackPolo2.jpeg",
                        "/Images/BlackPolo2.jpeg",


                ],
                soldOut: false,
                description: "Elegant silver rosary featuring a unique cross design. Perfect for daily wear."
        },
        {
                id: 3,
                name: "SONOFBOCH ASCENSION BELT BLACK",
                price: 150,
                images: ["/Images/BeltBlack.jpeg", "/Images/BeltBlack2.jpeg", "/Images/BeltBlack3.jpeg"],
                soldOut: true,
                description: "Matte black finish rosary. Bold, understated, and spiritual."
        },
        {
                id: 4,
                name: "SONOFBOCH ASCENSION BELT CHROME",
                price: 180,
                images: ["/Images/BeltChrome.jpeg", "/Images/BeltChrome2.jpeg", "/Images/BeltChrome3.jpeg"],
                soldOut: false,
                description: "Premium chrome plated rosary. A symbol of faith and luxury."
        },
        {
                id: 5,
                name: "SONOFBOCH ASCENSION BELT JESUS PIECE ",
                price: 180,
                images: ["/Images/BeltAngels.jpeg"],
                soldOut: false,
                description: "Premium chrome plated rosary. A symbol of faith and luxury."
        },
        {
                id: 6,
                name: "SONOFBOCH ASCENSION BELT RUNNING HORSES",
                price: 160,
                images: ["/Images/RunningHorses1.jpeg", "/Images/RunningHorses2.jpeg", "/Images/RunningHorses3.jpeg", "/Images/RunningHorses4.jpeg",],
                soldOut: false,
                description: "Natural obsidian beads providing a sleek, dark aesthetic."
        },
        {
                id: 7,
                name: "SONOFBOCH ASCENSION BELT MARCHING ANGELS",
                price: 180,
                images: ["/Images/MarchingAngels1.jpeg", "/Images/MarchingAngels2.jpeg", "/Images/MarchingAngels3.jpeg",],
                soldOut: false,
                description: "Premium chrome plated rosary. A symbol of faith and luxury."
        }
];
