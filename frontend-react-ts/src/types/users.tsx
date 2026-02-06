//interface User
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    role: string;
    address?: string;
    phone?: string;
}

//interface PaginationResponse
export interface PaginationResponse {
    data: User[];
    page: number;
    limit: number;
    total_data: number;
    total_page: number;
}
