import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "app/appSlice";
import {todolistsApi} from "features/todolistsList/api/todolistsApi/todolistsApi";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {AxiosError} from "axios";
import {changeTodolistEntityStatusAC} from "features/todolistsList/model/todolists/todolistsSlice";

export const fetchTodolists
    = createAsyncThunk("todolist/fetchTodolists",
    async () => {
        let res = await todolistsApi.getTodolists();
        return {todolists: res.data}
    })
export const removeTodolist
    = createAsyncThunk("todolist/removeTodolist",
    async (todolistId: string, {dispatch}) => {
        dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
        await todolistsApi.deleteTodolist(todolistId);
        return {id: todolistId}
    })
export const addTodolist = createAsyncThunk("todolist/addTodolist",
    async (title: string, {dispatch, rejectWithValue}) => {
        const res = await todolistsApi.createTodolist(title);
        if (res.data.resultCode === 0) {
            return {todolist: res.data.data.item};
        } else {
            handleServerAppError(res.data, dispatch, false);
            return rejectWithValue(res.data)
        }
    })

export const changeTodolistTitle
    = createAsyncThunk("todolist/changeTodolistTitle",
    async ({id, title}: { id: string, title: string }) => {
        await todolistsApi.updateTodolist(id, title);
        return {id, title};
    })