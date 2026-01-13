import { useMutation } from "@tanstack/react-query";
import Api from "../../../services/api";
import Cookies from "js-cookie";

export const useTransactionUpdate = () => {
    return useMutation({
        mutationFn: async ({ id, status }: { id: number, status: string }) => {
            const token = Cookies.get('token');
            const response = await Api.put(`/api/transactions/${id}`, { status }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
    });
}
