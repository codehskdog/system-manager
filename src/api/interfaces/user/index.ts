import type { Result, ResultList } from "@/types/api";
import { request } from '@/api';

export interface User {
    id: string;
    email?: string;
    username: string;
    name?: string;
    password?: string;
}

export const getUserList = (params: any) =>
    request.get<ResultList<any>>('/user', {
        params
    });

export const deleteUser = (id: string) => request.delete<Result>(`/user/${id}`);




