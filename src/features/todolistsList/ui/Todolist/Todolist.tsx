import React, {useEffect} from 'react'
import {AddItemForm} from 'components/AddItemForm/AddItemForm'
import {TodolistDomainType} from 'features/todolistsList/model/todolists/todolistsSlice'
import {Paper} from '@mui/material'
import {useAction} from "app/store";
import {tasksActions} from "features/todolistsList/index";

import {TaskType} from "features/todolistsList/api/tasksApi/tasksApi.types";
import {FilterButtons} from "features/todolistsList/ui/Todolist/FilterButton/FilterButtons";
import {Tasks} from "features/todolistsList/ui/Todolist/Tasks/Tasks";
import {TodolistTitle} from "features/todolistsList/ui/Todolist/TodolistTitle/TodolistTitle";

type Props = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, todolist, tasks}: Props) {

    const {
        addTask,
        fetchTasks
    } = useAction(tasksActions)


    useEffect(() => {
        if (demo) return
        fetchTasks(todolist.id)
    }, [])

    const addTaskHandler = async (title: string) =>
        addTask({title, todolistId: todolist.id})


    return <Paper style={{position: "relative", padding: "3px"}}>
        <TodolistTitle todolist={todolist}/>

        <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
        <Tasks todolist={todolist} tasks={tasks}/>
        <FilterButtons todolist={todolist}/>
    </Paper>
})

