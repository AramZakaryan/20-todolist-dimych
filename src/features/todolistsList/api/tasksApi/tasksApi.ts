import axios from 'axios'
import {GetTasksResponse, TaskType, UpdateTaskModel} from "features/todolistsList/api/tasksApi/tasksApi.types";
import {ApiResponseType} from "features/todolistsList/api/todolistsApi/todolistsApi.types";

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

export const tasksApi = {

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ApiResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ApiResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle});
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModel) {
        return instance.put<ApiResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}
