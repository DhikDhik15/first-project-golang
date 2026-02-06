export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface Transaction {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    price: number;
    status: string;
    start_date: string;
    end_date: string;
    total: number;
    is_return: boolean;
    user: User;
    product: Product;
}

export interface TransactionPagination {
    data: Transaction[];
    page: number;
    limit: number;
    total_data: number;
    total_page: number;
}
