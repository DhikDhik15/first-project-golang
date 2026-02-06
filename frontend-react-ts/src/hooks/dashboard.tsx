import { useQuery } from "@tanstack/react-query";

import Api from "../../services/api";

import Cookies from "js-cookie";
import { Graph } from "../types/dashboard";

export interface Dashboard {
    totalOrders: number;
    totalUsers: number;
    totalRevenue: number;
    graph: Graph[];
}
export const dashboard = () => {
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: async (): Promise<Dashboard> => {
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