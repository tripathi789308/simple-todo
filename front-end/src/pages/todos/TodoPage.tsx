import { useAuth } from "../../auth/authContext";
import { useSnackbar } from "../../auth/snackbarContext";
import { AddTodo } from "../../components/AddTodo";
import { EditTodo } from "../../components/EditTodo";
import { TodoList } from "../../components/TodoList";
import { Button } from "../../components/ui/button";
import apiService from "../../service";
import { Todo } from "../../types";
import { useState, useEffect } from "react";

enum ShowTodoContent {
  CREATE = 0,
  EDIT = 1,
  LIST = 2,
}

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentContent, setCurrentContent] = useState<ShowTodoContent>(
    ShowTodoContent.LIST,
  );
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { postService, getService, putService, deleteService } = apiService();
  const { showSnackbar } = useSnackbar();
  const { logout } = useAuth();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getService("/todos");
      if (response.data) {
        setTodos(response.data);
      } else {
        showSnackbar("Something went wrong", "error");
      }
    } catch (error) {
      console.error("Could not fetch todos:", error);
      showSnackbar("Something went wrong", "error");
    }
  };

  const handleAddTodo = async (newTodo: Omit<Todo, "id" | "completed">) => {
    try {
      const response = await postService("/todos", newTodo);
      if (response.data) {
        setTodos([...todos, response.data]);
        setCurrentContent(ShowTodoContent.LIST);
        showSnackbar("Successfully created todo", "success");
      } else {
        showSnackbar("Something went wrong", "error");
      }
    } catch (error) {
      console.error("Could not fetch todos:", error);
      showSnackbar("Something went wrong", "error");
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await putService(
        `/todos/${updatedTodo.id}`,
        updatedTodo,
      );
      if (response.data) {
        setTodos(
          todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          ),
        );
        showSnackbar("Successfully updated todo", "success");
      } else {
        showSnackbar("Something went wrong", "error");
      }
      setEditingTodo(null);
    } catch (error) {
      console.error("Could not update todo:", error);
      showSnackbar("Something went wrong", "error");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await deleteService(`/todos/${id}`);
      if (response.data) {
        setTodos(todos.filter((todo) => todo.id !== id));
        showSnackbar("Successfully deleted todo", "success");
      } else {
        showSnackbar("Something went wrong", "error");
      }
    } catch (error) {
      console.error("Could not delete todo:", error);
      showSnackbar("Something went wrong", "error");
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setCurrentContent(ShowTodoContent.EDIT);
  };

  const handleCancelEdit = () => {
    setCurrentContent(ShowTodoContent.LIST);
    setEditingTodo(null);
  };
  return (
    <div>
      <div className="mb-4 flex flex-row gap-4">
        <Button onClick={() => logout()}>Logout</Button>
        {currentContent !== ShowTodoContent.CREATE && (
          <Button onClick={() => setCurrentContent(ShowTodoContent.CREATE)}>
            Add Todo
          </Button>
        )}
      </div>
      {currentContent === ShowTodoContent.CREATE && (
        <AddTodo
          handleCancel={() => setCurrentContent(ShowTodoContent.LIST)}
          onAdd={handleAddTodo}
        />
      )}
      {currentContent !== ShowTodoContent.CREATE && (
        <>
          {editingTodo && (
            <EditTodo
              todo={editingTodo}
              onUpdate={handleUpdateTodo}
              onCancel={handleCancelEdit}
            />
          )}
          <TodoList
            todos={todos.filter((todo) => todo.id !== editingTodo?.id)}
            onDelete={handleDeleteTodo}
            onEdit={handleEditClick}
            isDisabled={!!editingTodo}
          />
        </>
      )}
    </div>
  );
}
