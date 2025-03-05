import { prisma } from "../../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RegisterPayload, LoginPayload, UserData } from "./user.interface";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

async function registerUser(
  payload: RegisterPayload,
): Promise<{ userData: UserData; token: string }> {
  const { username, password } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
    select: {
      username: true,
      id: true,
    },
  });

  const userData: UserData = {
    id: newUser.id,
    username: newUser.username,
  };

  const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
    expiresIn: "1D",
  });

  return { userData, token };
}

async function loginUser(
  payload: LoginPayload,
): Promise<{ userData: UserData; token: string } | null> {
  const { username, password } = payload;
  console.log("=> payload", payload);
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("User/Password is incorrect");
  }
  const userData: UserData = {
    id: user.id,
    username: user.username,
  };

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1D" });

  return { userData, token };
}

export default { registerUser, loginUser };
