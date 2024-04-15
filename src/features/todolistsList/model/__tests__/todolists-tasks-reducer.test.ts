import {
    // addTodolistAC,
    TodolistDomainType, todolistsSlice
} from 'features/todolistsList/model/todolists/todolistsSlice'
import {tasksSlice, TasksStateType} from 'features/todolistsList/model/tasks/tasksSlice'
import {addTodolist} from "features/todolistsList/model/todolists/todolistsActions";
import {TodolistType} from "features/todolistsList/api/todolistsApi/todolistsApi.types";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist: TodolistType = {
        title: 'new todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }

    const action = addTodolist.fulfilled({todolist:todolist},
        "requestId",
        'new todolist'
    );

    const endTasksState = tasksSlice(startTasksState, action)
    const endTodolistsState = todolistsSlice(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
