import {RequestStatusType} from 'app/app-reducer'
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {
    addTodolist,
    changeTodolistTitle,
    fetchTodolists,
    removeTodolist
} from "features/todolistsList/model/todolists/todolistsActions";
import {TodolistType} from "features/todolistsList/api/todolistsApi/todolistsApi.types";

const slice = createSlice({
    name: "todolist",
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistFilterAC(state,
                               action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(el =>
                el.id === action.payload.id
            )
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatusAC(state,
                                     action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(el =>
                el.id === action.payload.id
            )
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(clearTasksAndTodolists, () => {
                return []
            })
            .addCase(fetchTodolists.fulfilled, (state,
                                                action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolist.fulfilled, (state,
                                                action) => {
                const index = state.findIndex(el =>
                    el.id === action.payload.id
                )
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolist.fulfilled, (state,
                                             action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(el =>
                    el.id === action.payload.id
                )
                if (index > -1) {
                    state[index].title = action.payload.title
                }
            })
    },
})

export const todolistsSlice = slice.reducer


export const {
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
} = slice.actions

////////// THUNKS

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

