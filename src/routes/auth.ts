import { Router, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env["JWT_SECRET"] || "fallback_secret";

// @todo: Implement user registration and login routes here
interface User {
  id: string;
  email: string;
  passwordHash: string;
}
const users: User[] = []; // In-memory user store (replace with DB in production)

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        message: "missing fields",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      id: crypto.randomUUID(),
      email,
      passwordHash: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
