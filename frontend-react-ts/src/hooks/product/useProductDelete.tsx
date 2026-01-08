import { useMutation } from "@tanstack/react-query";

import Api from '../../../services/api';

import Cookies from 'js-cookie';

export const useProductDelete = () => {
    return useMutation({
        mutationFn: async (id: number) => {
            const token = Cookies.get('token');
            const response = await Api.delete(`/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        }
    });
}