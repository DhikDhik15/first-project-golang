import { useMutation } from "@tanstack/react-query";

import Api from '../../../services/api';

import Cookies from 'js-cookie';

interface ProductRequest {
    name: string;
    price: number;
    description: string;
    stock: number;
}

export const useProductUpdate = () => {
    return useMutation({
        mutationFn: async ({ id, data }: { id: number, data: ProductRequest }) => {
            const token = Cookies.get('token');
            const response = await Api.put(`/api/products/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }
    });
}
