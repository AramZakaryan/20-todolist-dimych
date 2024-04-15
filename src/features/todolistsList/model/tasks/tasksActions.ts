import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppRootStateType} from "app/store";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {AxiosError} from "axios";
import {UpdateDomainTaskModelType} from "features/todolistsList/model/tasks/tasksSlice";
import {appActions} from "app";
import {tasksApi} from "features/todolistsList/api/tasksApi/tasksApi";
import {UpdateTaskModel} from "features/todolistsList/api/tasksApi/tasksApi.types";

////////// THUNKS

export const fetchTasks
    = createAsyncThunk("task/fetchTasks",
    async (todolistId: string, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
        const res = await tasksApi.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
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
        try {
            let res = await tasksApi.createTask(todolistId, title);
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
                return {task}
                // const action = addTaskAC({task})
                // thunkAPI.dispatch(action)
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue({})
            }
        } catch (error) {
            handleServerNetworkError(error as AxiosError, dispatch)
            return rejectWithValue({})
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
        try {
            if (res.data.resultCode === 0) {
                return {taskId, model, todolistId}
                // const action = updateTaskAC({taskId, model, todolistId})
                // thunkAPI.dispatch(action)
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue({})
            }
        } catch (error) {
            handleServerNetworkError(error as AxiosError, dispatch);
            return rejectWithValue({})
        }
    })


