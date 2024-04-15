import {createSlice} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {addTask, fetchTasks, removeTask, updateTask} from "features/todolistsList/model/tasks/tasksActions";
import {
    addTodolist,
    fetchTodolists,
    removeTodolist
} from "features/todolistsList/model/todolists/todolistsActions";

import {TaskPriorities, TaskStatuses, TaskType} from "features/todolistsList/api/tasksApi/tasksApi.types";

// const initialState: TasksStateType = {}

const slice = createSlice({
    name: "task",
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                    state[action.payload.todolist.id] = []
                }
            )
            .addCase(removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(clearTasksAndTodolists, () => {
                return {}
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t =>
                    t.id === action.payload.taskId
                )
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                if (action.payload) {
                    const tasks = state[action.payload.task.todoListId]
                    tasks.unshift(action.payload.task)
                }
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                if (action.payload) {
                    const tasks = state[action.payload.todolistId]
                    const index = tasks.findIndex(t =>
                        t.id === action.payload?.taskId
                    )
                    if (index > -1) {
                        tasks[index] = {...tasks[index], ...action.payload.model}
                    }
                }
            })
    },
    selectors: {
        selectTaskSlice: (state) => state
    }
})

// state => state.tasks

export const tasksSlice = slice.reducer

////////// TYPES

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}