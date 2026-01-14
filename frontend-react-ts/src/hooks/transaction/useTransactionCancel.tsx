import { useMutation } from "@tanstack/react-query";
import Api from "../../../services/api";
import Cookies from "js-cookie";

export const useTransactionCancel = () => {
    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            const token = Cookies.get('token');
            const response = await Api.put(`/api/transactions/${id}/cancel`, { status: 'failed' }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        },
    });
}
