export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
}

export interface ProductPagination {
    data: Product[];
    page: number;
    limit: number;
    total_data: number;
    total_page: number;
}
