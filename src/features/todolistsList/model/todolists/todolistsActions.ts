import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "app/app-reducer";
import {todolistsApi} from "features/todolistsList/api/todolistsApi/todolistsApi";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {AxiosError} from "axios";
import {changeTodolistEntityStatusAC} from "features/todolistsList/model/todolists/todolistsSlice";

export const fetchTodolists
    = createAsyncThunk("todolist/fetchTodolists",
    async (_, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            let res = await todolistsApi.getTodolists();
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todolists: res.data}
        } catch (error) {
            handleServerNetworkError(error as AxiosError, dispatch);
            return rejectWithValue({})
        }
    })
export const removeTodolist
    = createAsyncThunk("todolist/removeTodolist",
    async (todolistId: string, {dispatch}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
        await todolistsApi.deleteTodolist(todolistId);
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {id: todolistId}
    })
export const addTodolist = createAsyncThunk("todolist/addTodolist",
    async (title: string, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatusAC({status: 'loading'}))
            const res = await todolistsApi.createTodolist(title);
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}));
                return {todolist: res.data.data.item};
            } else {
                handleServerAppError(res.data, dispatch, false);
                return rejectWithValue(res.data)
            }
        } catch (error) {
            handleServerNetworkError(error as AxiosError, dispatch);
            return rejectWithValue(null)
        }
    })

export const changeTodolistTitle
    = createAsyncThunk("todolist/changeTodolistTitle",
    async ({id, title}: { id: string, title: string }) => {
        const res = await todolistsApi.updateTodolist(id, title);
        return {id, title};
    })