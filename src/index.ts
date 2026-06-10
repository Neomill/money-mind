import express, { type Request, type Response } from "express";
import authRouter from "./routes/auth.ts";

const app = express();
const PORT = process.env["PORT"] || 3000;

// Built-in middleware to parse incoming JSON payloads
app.use(express.json());

app.use("/api/auth", authRouter);
// Standard healthcheck endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// App listener
app.listen(PORT, () => {
  console.log(
    `🚀 Backend server successfully running at http://localhost:${PORT}`,
  );
});
