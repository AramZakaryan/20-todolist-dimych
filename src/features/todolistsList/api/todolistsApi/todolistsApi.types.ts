export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type FieldErrorType = {
    field: string,
    error: string
};
export type ApiResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors?: FieldErrorType[]
    data: D
}