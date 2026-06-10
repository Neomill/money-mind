import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse incoming JSON payloads
app.use(express.json());

// Standard healthcheck endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// App listener
app.listen(PORT, () => {
  console.log(
    `🚀 Backend server successfully running at http://localhost:${PORT}`,
  );
});
