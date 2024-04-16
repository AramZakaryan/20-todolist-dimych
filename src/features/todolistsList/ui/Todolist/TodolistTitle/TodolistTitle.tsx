import {EditableSpan} from "components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import React from "react";
import {TodolistDomainType} from "features/todolistsList/model/todolists/todolistsSlice";
import {useAction} from "app/store";
import {todolistsActions} from "features/todolistsList/index";


type Props = {
    todolist: TodolistDomainType
}

export const TodolistTitle = ({todolist: {id, title, entityStatus}}: Props) => {

    const {
        removeTodolist,
        changeTodolistTitle,
    } = useAction(todolistsActions)

    const removeTodolistHandler = () => {
        removeTodolist(id)
    }

    const changeTodolistTitleHandler = (title: string) =>
        changeTodolistTitle({id, title})


    return (<>
        <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
        <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}
                    style={{position: "absolute", right: "5px", top: "5px"}}
        >
            <Delete/>
        </IconButton>
    </>)
}


