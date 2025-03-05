import { Router } from "express";
import todosRoutes from "./todos/todos.routes";
import userController from "./authentication/user.controller";
import passport from "passport";
const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.use(
  "/todos",
  passport.authenticate("jwt", { session: false }),
  todosRoutes,
);

export default router;
