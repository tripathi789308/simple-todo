import userService from "./user.service";
import { Request, Response } from "express";

async function register(req: Request, res: Response) {
  try {
    const { userData, token } = await userService.registerUser(req.body);
    res.status(201).json({ userData, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
}

async function login(req: Request, res: Response) {
  try {
    const result = await userService.loginUser(req.body);
    if (result) {
      res.json(result);
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
}

export default { register, login };
