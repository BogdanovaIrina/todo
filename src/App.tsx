import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "REACT", isDone: false},
            {id: v1(), title: "REDUX", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Eggs", isDone: true},
            {id: v1(), title: "Rice", isDone: false},
        ]
    });


    function removeTask(id: string, todolistId: string) {
        setTasks({...tasks, [todolistId]:tasks[todolistId].filter(f=>f.id!==id)})
    }

    function addTask(title: string, todolistId: string) {
        setTasks({...tasks, [todolistId]:[{id: v1(), title: title, isDone: false},...tasks[todolistId]]})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]:tasks[todolistId].map(m=>m.id===id? {...m, isDone}:m)})
    }
    //чтобы кнопки нажимались
    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(m=>m.id===todolistId? {...m, filter:value}:m))
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        delete tasks[id];
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {
//
                    let tasksForTodolist = tasks[tl.id];
                    if (tl.filter === "active") {tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);}
                    if (tl.filter === "completed") {tasksForTodolist = tasksForTodolist.filter(t => t.isDone);}

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
