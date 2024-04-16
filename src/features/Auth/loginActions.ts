import {createAsyncThunk} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {authAPI} from "features/Auth/authApi";
import {FieldErrorType} from "features/todolistsList/api/todolistsApi/todolistsApi.types";
import {LoginParamsType} from "features/Auth/authApi.types";

////////// THUNKS
export const loginTC = createAsyncThunk<
    undefined,
    LoginParamsType,
    {
        rejectValue: {
            errors: string[],
            fieldsErrors?: FieldErrorType[]
        }
    }
>("auth/login",
    async (data, {rejectWithValue}) => {
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            return
        } else {
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    })

export const logoutTC = createAsyncThunk("auth/logout",
    async (_, thunkAPI) => {
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(clearTasksAndTodolists())
            return
        } else {
            return thunkAPI.rejectWithValue(res.data)
        }
    })