import {createAsyncThunk} from "@reduxjs/toolkit";
import {setIsLoggedInAC} from "features/Auth";
import {authAPI} from "features/Auth/authApi";

//////////// THUNKS

export const initializeAppTC = createAsyncThunk("app/initializeApp",
    async (_, {dispatch}) => {
        const res = await authAPI.me();
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
        }
        // return
        // dispatch(setAppInitializedAC({value: true}));
    })