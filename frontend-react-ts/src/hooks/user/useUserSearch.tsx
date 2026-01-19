import { useQuery } from "@tanstack/react-query";
import Api from "../../../services/api";
import Cookies from "js-cookie";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
    address?: string;
    phone?: string;
}

export const useUserSearch = (query: string) => {
    const token = Cookies.get("token");       
    return useQuery<User[]>({
        queryKey: ["users", query],
        queryFn: async () => {
            const response = await Api.get(`/api/users?name=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data as User[];
        },
        enabled: !!query, // 🔥 prevents calling when query is empty
    });
};

