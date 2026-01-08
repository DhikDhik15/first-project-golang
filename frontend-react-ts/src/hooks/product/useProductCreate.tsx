import { useMutation } from "@tanstack/react-query";

import Api from "../../../services/api";

import Cookies from "js-cookie";

interface ProductRequest {
    name: string;
    price: number;
    description: string;
    stock: number;
}

export const useProductCreate = () => {

    return useMutation({

        // mutation untuk create product
        mutationFn: async (data: ProductRequest) => {

            //get token from cookies
            const token = Cookies.get('token');

            //menggunakan service API untuk register
            const response = await Api.post('/api/products', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            //mengembalikan response data
            return response.data;
        }
    });
};

