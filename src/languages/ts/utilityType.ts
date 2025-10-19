interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

//Pick<T, K>
type PickTodo = Pick<Todo, 'title' | 'completed'>

//implementation
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type MyPickTodo = MyPick<Todo, 'title'>
const myPickTodo: MyPickTodo = {
    title: 'title',
}

