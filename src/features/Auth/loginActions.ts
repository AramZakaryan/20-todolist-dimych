import {createAsyncThunk} from "@reduxjs/toolkit";
import {setAppStatusAC} from "app/appSlice";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {AxiosError} from "axios";
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
    async (data, thunkAPI) => {
        const res = await authAPI.login(data);
        if (res.data.resultCode === 0) {
            // thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
            // thunkAPI.dispatch(setIsLoggedInAC({value: true}))
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    })

export const logoutTC = createAsyncThunk("auth/logout",
    async (_, thunkAPI) => {
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(clearTasksAndTodolists())
            return
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    })