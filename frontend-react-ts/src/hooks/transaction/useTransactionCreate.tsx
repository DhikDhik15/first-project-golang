import { useMutation } from "@tanstack/react-query";

import Api from "../../../services/api";

import Cookies from "js-cookie";

export const useTransactionCreate = () => {
    return useMutation({
        mutationFn: async (data: any) => {
            const token = Cookies.get('token');
            const response = await Api.post('/api/transactions', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
    });
}
