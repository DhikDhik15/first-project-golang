import { useQuery } from "@tanstack/react-query";

import Api from "../../services/api";

import Cookies from "js-cookie";

export interface Dashboard {
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
}
export const dashboard = () => {
    return useQuery<Dashboard, Error>({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const token = Cookies.get('token');
            const response = await Api.get('/api/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data;
        },
    });
}