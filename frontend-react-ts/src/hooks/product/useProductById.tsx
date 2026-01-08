import { useQuery } from "@tanstack/react-query";

import Api from '../../../services/api';

import Cookies from 'js-cookie';

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
}

export const useProductById = (id: number) => {
    return useQuery<Product, Error>({
        queryKey: ['product', id],
        queryFn: async () => {
            const token = Cookies.get('token');
            const response = await Api.get(`/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data as Product;
        },
    });
}