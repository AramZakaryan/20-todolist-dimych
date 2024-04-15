import * as tasksActions from 'features/todolistsList/model/tasks/tasksActions'
import * as todolistsAsyncActions from "features/todolistsList/model/todolists/todolistsActions"
import {changeTodolistFilterAC, changeTodolistEntityStatusAC} from "features/todolistsList/model/todolists/todolistsSlice"

const todolistsActions = {
    ...todolistsAsyncActions,
    changeTodolistFilter: changeTodolistFilterAC,
    changeTodolistEntityStatusAC
}

export {
    tasksActions,
    todolistsActions
}

export {TodolistsList} from "features/todolistsList/ui/TodolistsList"
