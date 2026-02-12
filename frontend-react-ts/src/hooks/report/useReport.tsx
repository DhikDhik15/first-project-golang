import { useQuery } from "@tanstack/react-query";

import Api from "../../../services/api";

import Cookies from "js-cookie";

export interface Transaction {
    id: number;
    quantity: number;
    price: number;
    status: string;
    start_date: string;
    end_date: string;
    is_return: boolean;
    is_late: boolean;
    user: {
        id: number;
        name: string;
    };
    product: {
        id: number;
        name: string;
    };
}
export const useReport = () => {
    return useQuery<Transaction[], Error>({
        queryKey: ['transactions'],
        queryFn: async () => {
            const token = Cookies.get('token');
            const response = await Api.get('/api/reports/transactions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data.map((item: any) => ({
                id: item.id,
                quantity: item.quantity,
                is_return: item.is_return,
                is_late: item.is_late,
                status: item.status,
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
