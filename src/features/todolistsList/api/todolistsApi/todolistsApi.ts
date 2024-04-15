import axios from 'axios'
import {ApiResponseType, TodolistType} from "features/todolistsList/api/todolistsApi/todolistsApi.types";

const config = {
    withCredentials: true,
    headers: {
        'API-KEY': '1cdd9f77-c60e-4af5-b194-659e4ebd5d41'
    }
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...config
})

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ApiResponseType<{ item: TodolistType }>>('todo-lists', {title: title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ApiResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ApiResponseType>(`todo-lists/${id}`, {title: title});
    }
}




