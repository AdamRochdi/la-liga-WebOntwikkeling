import express from "express";
import path from "path";
import clubsRouter from "./routes/clubs";

const app = express();
const PORT = 3000;

// Serve static files from /public folder
app.use(express.static(path.join(__dirname, "..", "public")));

// API route for clubs
app.use("/clubs", clubsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
