export interface Product {
    id: number;
    title: string;
    category?: string;
    price_inr?: number;
    image_url?: string;
    lat: number;
    lon: number;
    quantity_available?: number;
    quantity_unit?: string;
    created_at: string;
}
