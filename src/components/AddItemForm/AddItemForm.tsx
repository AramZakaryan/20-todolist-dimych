import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string) => Promise<any>
    disabled?: boolean
}

export const AddItemForm = React.memo(function ({addItem, disabled = false}: AddItemFormPropsType) {

        let [title, setTitle] = useState('')
        let [error, setError] = useState<string | null>(null)

        const addItemHandler = async () => {

            if (title.trim() === '') {
                setError('Title is required')
            }

            const res = await addItem(title)
            if (!res.error) {
                setTitle('')
            } else {
                setError(res.payload.messages[0])
            }
        }

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) {
                setError(null);
            }
            if (e.charCode === 13) {
                addItemHandler();
            }
        }

        return <div>
            <TextField variant="outlined"
                       disabled={disabled}
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       label="Title"
                       helperText={error}
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={disabled} style={{marginLeft: "5px"}}>
                <AddBox/>
            </IconButton>
        </div>
    }
)
