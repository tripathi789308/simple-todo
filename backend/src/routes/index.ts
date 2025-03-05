import { Router } from "express";
import passport from "passport";
import todosRoutes from "./todos/index";
const router = Router();

router.use("/todos", todosRoutes);

export default router;
