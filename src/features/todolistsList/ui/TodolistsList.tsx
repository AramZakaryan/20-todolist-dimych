import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {AppRootStateType, useAction} from 'app/store'
import {TodolistDomainType} from 'features/todolistsList/model/todolists/todolistsSlice'
import {Grid} from '@mui/material'
import {AddItemForm} from 'components/AddItemForm/AddItemForm'
import {Todolist} from 'features/todolistsList/ui/Todolist/Todolist'
import {Navigate} from 'react-router-dom'
import {selectIsLoggedIn} from "features/Auth";
import {TasksStateType} from "features/todolistsList/model/tasks/tasksSlice";
import {todolistsActions} from "features/todolistsList/index";

type Props = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}: Props) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(selectIsLoggedIn)


    const {
        addTodolist,
        fetchTodolists,
    } = useAction(todolistsActions)

    useEffect(() => {
        if (demo || !isLoggedIn) return;
        fetchTodolists()
    }, [])


    const addItemHandler = async (title: string) => addTodolist(title)

    if (!isLoggedIn) return <Navigate to={"/login"}/>

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addItemHandler}/>
        </Grid>
        <Grid container spacing={3} style={{flexWrap: "nowrap", overflowX: "scroll"}}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]
                    return <Grid item key={tl.id}>
                        <div style={{width: "300px"}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                demo={demo}
                            />
                        </div>
                    </Grid>
                })
            }
        </Grid>
    </>
}
