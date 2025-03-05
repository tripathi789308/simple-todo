import React, { useState, useEffect } from "react";
import { Todo } from "../types";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

interface EditTodoProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onCancel: () => void;
}

export const EditTodo: React.FC<EditTodoProps> = ({
  todo,
  onUpdate,
  onCancel,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [dueDate, setDueDate] = useState(
    todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : "",
  );
  const [completed, setCompleted] = useState(todo.completed);

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setDueDate(
      todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : "",
    );
    setCompleted(todo.completed);
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }
    onUpdate({
      ...todo,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      completed: completed,
    });
  };

  return (
    <div className="mb-4 p-4 border rounded shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Edit Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <Label htmlFor="editTitle">Title:</Label>
          <Input
            type="text"
            id="editTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="editDescription">Description:</Label>
          <Input
            type="text"
            id="editDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="editDueDate">Due Date:</Label>
          <Input
            type="date"
            id="editDueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="editCompleted">Completed:</Label>
          <Input
            type="checkbox"
            id="editCompleted"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mr-2 leading-tight"
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};
