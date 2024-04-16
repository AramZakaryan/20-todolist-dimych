import {Action, createSlice, isFulfilled, isPending, isRejected, PayloadAction, UnknownAction} from "@reduxjs/toolkit";
import {initializeAppTC} from "app/appActions";
import {addTodolist, changeTodolistTitle} from "features/todolistsList/model/todolists/todolistsActions";
import {tasksActions, todolistsActions} from "features/todolistsList";

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
                (state, action: any) => {
                    state.status = "failed"
                    if (action.type === todolistsActions.addTodolist.rejected.type ||
                        // "todolist/addTodolist/rejected" ||
                    action.type ===tasksActions.addTask.rejected.type
                        // "task/addTask/rejected"
                    ) return

                    if (action.payload) {
                        state.error = action.payload?.messages[0]
                    }else {
                        state.error = action.error.message
                    }

                    console.log(action)
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



