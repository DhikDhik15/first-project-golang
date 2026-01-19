import { useQuery } from "@tanstack/react-query";

import Api from "../../../services/api";

import Cookies from "js-cookie";

import { Product, ProductPagination } from "../../types/products";

interface UseProductParams {
    page?: number
    search?: string
    sort?: string
    order?: 'asc' | 'desc'
}

export const useProduct = ({
    page = 1,
    search = '',
    sort = 'id',
    order = 'desc',
}: UseProductParams) => {
    return useQuery<ProductPagination, Error>({
        queryKey: ['products', page, search, sort, order],
        queryFn: async () => {
            const token = Cookies.get('token')

            const response = await Api.get('/api/products', {
                params: {
                    page,
                    q: search,
                    sort,
                    order,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return response.data.data
        },

        keepPreviousData: true, // ⭐ penting untuk pagination
    })
}