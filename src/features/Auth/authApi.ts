import axios from 'axios'
import {ApiResponseType} from "features/todolistsList/api/todolistsApi/todolistsApi.types";
import {LoginParamsType} from "features/Auth/authApi.types";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '1cdd9f77-c60e-4af5-b194-659e4ebd5d41'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ApiResponseType<{ userId?: number }>>('auth/login', data);
    },
    logout() {
        return instance.delete<ApiResponseType<{ userId?: number }>>('auth/login');
    },
    me() {
        return instance.get<ApiResponseType<{ id: number; email: string; login: string }>>('auth/me');
    }
}