import { useQuery } from "@tanstack/react-query";

import Api from "../../../services/api";

import Cookies from "js-cookie";

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
    total: number;
    user: User;
    product: Product;
}

export const useTransaction = () => {
    return useQuery<Transaction[], Error>({
        queryKey: ['transactions'],
        queryFn: async () => {
            const token = Cookies.get('token');
            const response = await Api.get('/api/transactions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data.map((item: any) => ({
                id: item.id,
                quantity: item.quantity,
                price: item.price,
                status: item.status,
                start_date: item.start_date,
                end_date: item.end_date,
                user: {
                    id: item.User.id,
                    name: item.User.name,
                },
                product: {
                    id: item.Product.id,
                    name: item.Product.name,
                },
            }));
        },
    });
}