import React, {useEffect} from 'react'
import {AddItemForm} from 'components/AddItemForm/AddItemForm'
import {EditableSpan} from 'components/EditableSpan/EditableSpan'
import {Task} from 'features/todolistsList/ui/Todolist/Task/Task'
import {FilterValuesType, TodolistDomainType} from 'features/todolistsList/model/todolists/todolistsSlice'
import {Button, IconButton, Paper} from '@mui/material'
import {Delete} from '@mui/icons-material'
import {useAction} from "app/store";
import {tasksActions, todolistsActions} from "features/todolistsList/index";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsColorOverrides} from "@mui/material/Button/Button";

import {TaskStatuses, TaskType} from "features/todolistsList/api/tasksApi/tasksApi.types";

type Props = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: Props) {

    const {
        addTask,
        fetchTasks
    } = useAction(tasksActions)

    const {
        removeTodolist,
        changeTodolistTitle,
        changeTodolistFilter,
    } = useAction(todolistsActions)

    useEffect(() => {
        if (demo) return
        fetchTasks(props.todolist.id)
    }, [])

    const addTaskHandler = async (title: string) =>
        addTask({title, todolistId: props.todolist.id})

    const removeTodolistHandler = () => {
        removeTodolist(props.todolist.id)
    }
    const changeTodolistTitleHandler = (title: string) =>
        changeTodolistTitle({id: props.todolist.id, title: title})

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const changeTodolistFilterHandler = (filter: FilterValuesType) =>
        changeTodolistFilter({filter, id: props.todolist.id})

    const color: FilterButtonColorType = "inherit"
    const renderFilterButton = (buttonFilter: FilterValuesType) => {
        return (
            <Button variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
                    onClick={() => changeTodolistFilterHandler(buttonFilter)}
                    color={color}
            >{buttonFilter}
            </Button>
        )
    }

    return <Paper style={{position: "relative", padding: "5px"}}>
        <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === 'loading'}
                    style={{position: "absolute", right: "5px", top: "5px"}}
        >
            <Delete/>
        </IconButton>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler}/>
        </h3>


        <AddItemForm addItem={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t =>
                    <Task key={t.id} task={t} todolistId={props.todolist.id}/>)
            }
            {!tasksForTodolist.length && <div style={{padding: "10px", color: "grey"}}>"no task"</div>}
        </div>
        <div style={{paddingTop: '10px'}}>
            {renderFilterButton("all")}
            {renderFilterButton("active")}
            {renderFilterButton("completed")}
        </div>
    </Paper>
})

type FilterButtonColorType = OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
>