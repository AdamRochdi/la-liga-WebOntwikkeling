import express from "express";
import spelersRouter from "./routes/spelers.js"; // .js als je ES modules gebruikt
const app = express();
const PORT = process.env.PORT || 3000;
// ✅ Dit moet BOVEN je routes staan
app.use(express.static("public"));
// API route
app.use("/spelers", spelersRouter);
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
