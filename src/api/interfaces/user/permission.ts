import { request } from "@/api";
import type { Result, ResultData, ResultList } from "@/types/api";
export interface Permission {
    id: string;

    parentId?: string;

    parent?: Permission;

    children: Permission[];

    name: string;

    description: string;

    type: number;

    isSystem: boolean;

    createdAt: Date;

    updatedAt: Date;

}

export interface ApiAuth {
    id: string;

    name: string;

    description: string;

    method: string;

    path: string;

    permissions: string[];
}
export const getApiAuthList = (params: any) => request.get<ResultList<ApiAuth>>('/auth/apiAuth', { params })
export const createApiAuth = (data: ApiAuth) => request.post<Result>('/auth/apiAuth', {
    data
});
export const updateApiAuth = (id: string, data: ApiAuth) => request.put<Result>(`/auth/apiAuth/${id}`, data);
export const deleteApiAuth = (id: string) => request.delete<Result>(`/auth/apiAuth/${id}`);
export const getApiAuth = (id: string) => request.get<ResultData<ApiAuth>>(`/auth/apiAuth/${id}`);

export const getPermissionList = (params: any) => request.get<ResultList<Permission>>('/auth/permission', { params })

export const createPermission = (data: Permission) => request.post<Result>('/auth/permission', data)
export const updatePermission = (id: string, data: Permission) => request.put<Result>(`/auth/permission/${id}`, data)
export const deletePermission = (id: string) => request.delete<Result>(`/auth/permission/${id}`)
export const getPermission = (id: string) => request.get<ResultData<Permission>>(`/auth/permission/${id}`)

export const getRoleList = (params: any) => request.get<ResultList<any>>('/auth/role', { params })
export const createRole = (data: any) => request.post<Result>('/auth/role', data)
export const updateRole = (id: string, data: any) => request.put<Result>(`/auth/role/${id}`, data)
export const deleteRole = (id: string) => request.delete<Result>(`/auth/role/${id}`)
export const getRole = (id: string) => request.get<ResultData<any>>(`/auth/role/${id}`)
