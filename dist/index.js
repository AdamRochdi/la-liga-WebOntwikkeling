import express from "express";
import spelersRouter from "./routes/spelers.js"; // .js als je ES modules gebruikt
const app = express();
const PORT = process.env.PORT || 3000;
// Hier koppel je je router
app.use("/spelers", spelersRouter);
// Optioneel: voeg een eenvoudige root route toe
app.get("/", (req, res) => {
    res.send("Welkom op de API van La Liga!");
});
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
});
