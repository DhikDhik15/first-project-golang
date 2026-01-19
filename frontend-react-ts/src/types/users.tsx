//interface User
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
    address?: string;
}

//interface PaginationResponse
export interface PaginationResponse {
    data: User[];
    page: number;
    limit: number;
    totalData: number;
    totalPage: number;
}
