export interface Product {
    id: number;
    available: boolean;
    description: string;
    image: string;
    name: string;
    price: string;
}

export type ProductEditing = Omit<Product, 'id' | 'available'> 