import { Request, Response } from "express";
import { prisma } from "../../db";

const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const todos = await prisma.todo.findMany({
      where: { userId: userId },
    });
    res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const getTodosById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const todoId = parseInt(req.params.id);

    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
        userId: userId,
      },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const { title, description, dueDate } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: userId,
      },
    });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;
    const todoId = parseInt(req.params.id);
    const { title, description, dueDate, completed } = req.body;

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
        userId: userId,
      },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        completed,
      },
    });
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todoId = parseInt(req.params.id);
    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};

export { getTodos, getTodosById, deleteTodo, createTodo, updateTodo };
