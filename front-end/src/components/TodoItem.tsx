import React from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  isDisabled: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onEdit,
  isDisabled,
}) => {
  return (
    <li className="mb-2 p-2 border rounded shadow-sm flex items-center justify-between">
      <div>
        <h3 className="font-semibold">{todo.title}</h3>
        {todo.description && (
          <p className="text-gray-600">{todo.description}</p>
        )}
        {todo.dueDate && (
          <p className="text-gray-500">
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </p>
        )}
        <p>Completed: {todo.completed ? "Yes" : "No"}</p>
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => !isDisabled && onEdit(todo)}
          disabled={isDisabled}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => !isDisabled && onDelete(todo.id)}
          disabled={isDisabled}
        >
          Delete
        </button>
      </div>
    </li>
  );
};
