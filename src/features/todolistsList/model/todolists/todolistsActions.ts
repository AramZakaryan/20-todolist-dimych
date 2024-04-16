import {createAsyncThunk} from "@reduxjs/toolkit";
import {todolistsApi} from "features/todolistsList/api/todolistsApi/todolistsApi";
import {changeTodolistEntityStatusAC} from "features/todolistsList/model/todolists/todolistsSlice";

export const fetchTodolists
    = createAsyncThunk("todolist/fetchTodolists",
    async () => {
        let res = await todolistsApi.getTodolists();
        return {todolists: res.data}
    })
export const removeTodolist
    = createAsyncThunk("todolist/removeTodolist",
    async (id: string, {dispatch}) => {
        dispatch(changeTodolistEntityStatusAC({id, status: 'loading'}))
        await todolistsApi.deleteTodolist(id);
        return {id}
    })
export const addTodolist = createAsyncThunk("todolist/addTodolist",
    async (title: string, {dispatch, rejectWithValue}) => {
        const res = await todolistsApi.createTodolist(title);
        if (res.data.resultCode === 0) {
            return {todolist: res.data.data.item};
        } else {
            return rejectWithValue(res.data)
        }
    })

export const changeTodolistTitle
    = createAsyncThunk("todolist/changeTodolistTitle",
    async ({id, title}: { id: string, title: string }) => {
        await todolistsApi.updateTodolist(id, title);
        return {id, title};
    })