export type Product = {
    id: string;
    name: string;
    keywords: string[];
    image: string;
    rating: {
        stars: number;
        count: number;
    };
    priceCents: number;
    createdAt: string;
    updatedAt: string;
};
export type UserState = {
    isLoggedIn: boolean;
    username: string,
    setUsername: (username: string) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    userImage: string;
    setUserImage: (userImage: string) => void;
};
export type CartItem = {
    productionId: string;
    quantity: number;
    deliveryOptionId: string;
};
export type Cart = CartItem[];
