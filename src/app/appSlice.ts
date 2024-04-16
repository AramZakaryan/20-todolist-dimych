import {Action, createSlice, isFulfilled, isPending, isRejected, PayloadAction, UnknownAction} from "@reduxjs/toolkit";
import {initializeAppTC} from "app/appActions";
import {addTodolist, changeTodolistTitle} from "features/todolistsList/model/todolists/todolistsActions";

export const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}


const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as null | string,
        isInitialized: false
    },
    reducers: {
        setAppErrorAC(state,
                      action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state,
                       action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        }
    },
    extraReducers: builder => {
        builder
            .addCase(initializeAppTC.fulfilled, (state) => {
                state.isInitialized = true
            })
            .addMatcher(
                isPending(addTodolist, changeTodolistTitle),
                (state, action) => {
                    state.status = "loading"

                }
            )
            .addMatcher(
                isFulfilled,
                (state, action) => {
                    state.status = "idle"
                }
            )
            .addMatcher(
                isRejected,
                (state, action) => {
                    state.status = "failed"
                    state.error = action.error.message || null
                }
            )
    }
})

export const appSlice = slice.reducer

export const {
    setAppErrorAC,
    setAppStatusAC,
    // setAppInitializedAC
} = slice.actions


export const appAsyncActions = {initializeAppTC}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>



