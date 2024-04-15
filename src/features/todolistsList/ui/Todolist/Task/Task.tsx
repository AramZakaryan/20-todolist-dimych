import React, {ChangeEvent} from 'react'
import {Checkbox, IconButton} from '@mui/material'
import {EditableSpan} from 'components/EditableSpan/EditableSpan'
import {Delete} from '@mui/icons-material'
import {useAction} from "app/store";
import {tasksActions} from "features/todolistsList/index";
import s from "./Task.module.css"

import {TaskStatuses, TaskType} from "features/todolistsList/api/tasksApi/tasksApi.types";

type Props = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo(({task, todolistId}: Props) => {

    const {
        updateTask,
        removeTask,
    } = useAction(tasksActions)

    const removeTaskHandler = () => removeTask({
        taskId: task.id,
        todolistId: todolistId
    })

    const updateTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        updateTask({taskId: task.id, model: {status}, todolistId: todolistId})
    }

    const updateTaskTitleHandler = (title: string) => {
        updateTask({taskId: task.id, model: {title}, todolistId: todolistId})
    }
    return <div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ''}
                style={{position: "relative"}}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={updateTaskStatusHandler}
        />

        <EditableSpan value={task.title} onChange={updateTaskTitleHandler}/>
        <IconButton onClick={removeTaskHandler} style={{position: "absolute", right: "5px"}}>
            <Delete fontSize={"small"}/>
        </IconButton>
    </div>
})
