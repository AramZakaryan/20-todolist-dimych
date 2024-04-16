import {FilterValuesType, TodolistDomainType} from "features/todolistsList/model/todolists/todolistsSlice";
import {Button} from "@mui/material";
import React from "react";
import {OverridableStringUnion} from "@mui/types";
import {ButtonPropsColorOverrides} from "@mui/material/Button/Button";
import {useAction} from "app/store";
import {todolistsActions} from "features/todolistsList/index";

type Props = {
    todolist: TodolistDomainType
}

export const FilterButtons = ({todolist: {id, filter}}: Props) => {
    const {
        changeTodolistFilter,
    } = useAction(todolistsActions)

    const changeTodolistFilterHandler = (filter: FilterValuesType) =>
        changeTodolistFilter({filter, id})

    const renderFilterButton = (buttonFilter: FilterValuesType, color:FilterButtonColorType) => {
        return (<Button variant={filter === buttonFilter ? 'outlined' : 'text'}
                        onClick={() => changeTodolistFilterHandler(buttonFilter)}
                        color={color}
            >{buttonFilter}
            </Button>
        )
    }

    return <div style={{paddingTop: '10px'}}>
        {renderFilterButton("all", "inherit")}
        {renderFilterButton("active", "primary")}
        {renderFilterButton("completed", "secondary")}
    </div>
}

type FilterButtonColorType = OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
>
