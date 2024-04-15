import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from 'app/app-reducer'
import {Dispatch} from 'redux'
import {ApiResponseType} from "features/todolistsList/api/todolistsApi/todolistsApi.types";

export const handleServerAppError = <D>(data: ApiResponseType<D>, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status:'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC({error:error.message ? error.message : 'Some error occurred'}))
    dispatch(setAppStatusAC({status:'failed'}))
}
