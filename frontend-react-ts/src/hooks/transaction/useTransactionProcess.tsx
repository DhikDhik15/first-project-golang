import { useMutation } from "@tanstack/react-query";
import Api from "../../../services/api";
import Cookies from "js-cookie";

export const useTransactionProcess = () => {
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            const token = Cookies.get('token');
            const response = await Api.put(`/api/transactions/${id}/process`, { status: 'success' }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
    });
}