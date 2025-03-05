import { useAuth } from "../../auth/authContext";
import { AddTodo } from "../../components/AddTodo";
import { EditTodo } from "../../components/EditTodo";
import { TodoList } from "../../components/TodoList";
import { Button } from "../../components/ui/button";
import { Constants } from "../../enums";
import { Todo } from "../../types";
import { useState, useEffect } from "react";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const token = localStorage.getItem(Constants.Token);
  const { logout } = useAuth();

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/todos");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Could not fetch todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (newTodo: Omit<Todo, "id" | "completed">) => {
    try {
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`, // Replace with actual auth
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const addedTodo: Todo = await response.json();
      setTodos([...todos, addedTodo]);
    } catch (error) {
      console.error("Could not add todo:", error);
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await fetch(
        `http://localhost:3001/todos/${updatedTodo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${token}`,
          },
          body: JSON.stringify(updatedTodo),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
      );
      setEditingTodo(null);
    } catch (error) {
      console.error("Could not update todo:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Could not delete todo:", error);
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };
  return (
    <>
      <Button onClick={() => logout()}>Logout</Button>
      <AddTodo onAdd={handleAddTodo} />
      {editingTodo ? (
        <EditTodo
          todo={editingTodo}
          onUpdate={handleUpdateTodo}
          onCancel={handleCancelEdit}
        />
      ) : null}
      <TodoList
        todos={todos}
        onDelete={handleDeleteTodo}
        onEdit={handleEditClick}
      />
    </>
  );
}
