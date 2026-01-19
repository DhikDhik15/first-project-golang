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
    totalData: number;
    totalPage: number;
}
