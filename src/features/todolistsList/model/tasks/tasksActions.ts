import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppRootStateType} from "app/store";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {AxiosError} from "axios";
import {UpdateDomainTaskModelType} from "features/todolistsList/model/tasks/tasksSlice";
import {tasksApi} from "features/todolistsList/api/tasksApi/tasksApi";
import {UpdateTaskModel} from "features/todolistsList/api/tasksApi/tasksApi.types";

////////// THUNKS

export const fetchTasks
    = createAsyncThunk("task/fetchTasks",
    async (todolistId: string, thunkAPI) => {
        const res = await tasksApi.getTasks(todolistId)
        const tasks = res.data.items
        return {tasks, todolistId}
    })
export const removeTask = createAsyncThunk("task/removeTask",
    async ({taskId, todolistId}: { taskId: string, todolistId: string }, thunkAPI) => {
        await tasksApi.deleteTask(todolistId, taskId);
        return {taskId, todolistId};
    })
export const addTask = createAsyncThunk("task/addTask",
    async ({title, todolistId}: { title: string, todolistId: string },
           {dispatch, rejectWithValue}) => {
            let res = await tasksApi.createTask(todolistId, title);
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                return {task}
            } else {
                handleServerAppError(res.data, dispatch, false);
                return rejectWithValue(res.data)
            }
    })
export const updateTask = createAsyncThunk("task/updateTask",
    async ({taskId, model, todolistId}: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string },
           {dispatch, getState, rejectWithValue}) => {
        const state = getState() as AppRootStateType
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return rejectWithValue({})
        }

        const apiModel: UpdateTaskModel = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...model
        }

        const res = await tasksApi.updateTask(todolistId, taskId, apiModel)
            if (res.data.resultCode === 0) {
                return {taskId, model, todolistId}
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue({})
            }
    })


