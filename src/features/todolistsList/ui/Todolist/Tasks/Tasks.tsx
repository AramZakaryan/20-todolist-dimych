import {Task} from "features/todolistsList/ui/Todolist/Tasks/Task/Task";
import React from "react";
import {TaskStatuses, TaskType} from "features/todolistsList/api/tasksApi/tasksApi.types";
import {TodolistDomainType} from "features/todolistsList/model/todolists/todolistsSlice";

type Props = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}

export const Tasks = ({todolist:{id, filter}, tasks}: Props) => {

    let tasksForTodolist = tasks

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    return (<div>
            {
                tasksForTodolist.map(t =>
                    <Task key={t.id} task={t} todolistId={id}/>)
            }
            {!tasksForTodolist.length && <div style={{padding: "10px", color: "grey"}}>"no task"</div>}
        </div>
    )
}