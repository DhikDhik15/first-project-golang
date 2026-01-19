// import hook useQuery from react-query
import { useQuery } from '@tanstack/react-query';

//import service Api
import Api from '../../../services/api';

// import js-cookie
import Cookies from 'js-cookie';
import { PaginationResponse, User } from '../../types/users';

interface UseUsersParams {
    page?: number
    search?: string
    sort?: string
    order?: 'asc' | 'desc'
}

//hook useUsers dengan return type User
export const useUsers = ({
    page = 1,
    search = '',
  sort = 'id',
  order = 'desc',
}: UseUsersParams) => {

  return useQuery<PaginationResponse<User>, Error>({
    queryKey: ['users', page, search, sort, order],

    queryFn: async () => {
      const token = Cookies.get('token')

      const response = await Api.get('/api/users', {
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
