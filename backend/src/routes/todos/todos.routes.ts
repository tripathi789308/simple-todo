import express, { Request, Response } from "express";
import { Todo } from "@prisma/client";
import { prisma } from "../../db";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getTodosById,
  updateTodo,
} from "./todos.service";

const router = express.Router();

// GET all todos for a user
router.get("/", getTodos);

router.get("/:id", getTodosById);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
