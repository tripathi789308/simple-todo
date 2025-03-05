import React from 'react';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: number) => void;
    onEdit: (todo: Todo) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onDelete, onEdit }) => {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
};