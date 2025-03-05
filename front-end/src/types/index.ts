export interface Todo {
    id: number;
    title: string;
    description?: string | null;
    dueDate?: string | null;
    completed: boolean;
    userId: number;
}

export interface User {
    id : number;
    username : string;
}