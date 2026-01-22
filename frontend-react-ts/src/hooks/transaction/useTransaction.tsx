import { useQuery } from "@tanstack/react-query";

import Api from "../../../services/api";

import Cookies from "js-cookie";

import { TransactionPagination } from "../../types/transactions";

interface UseTransactionParams {
    page?: number
    search?: string
    sort?: string
    order?: 'asc' | 'desc'
}

export const useTransaction = ({
    page = 1,
    search = '',
    sort = 'id',
    order = 'desc',
}: UseTransactionParams) => {
    return useQuery({
        queryKey: ['transactions', page, search, sort, order],
        queryFn: async (): Promise<TransactionPagination> => {
            const token = Cookies.get('token');

            const response = await Api.get('/api/transactions', {
                params: {
                    page,
                    q: search,
                    sort,
                    order,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const pagination = response.data.data;

            return {
                ...pagination,
                data: pagination.data.map((item: any) => ({
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    status: item.status,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    is_return: item.is_return,
                    is_late: item.is_late,
                    user: {
                        id: item.User?.id,
                        name: item.User?.name,
                    },
                    product: {
                        id: item.Product?.id,
                        name: item.Product?.name,
                    },
                })),
            };
        },
        placeholderData: (previousData) => previousData,
    });
};