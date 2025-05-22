import path from "path";
import express from "express";
import spelersRouter from "./routes/spelers.js";
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use("/spelers", spelersRouter);
// Eventueel: serveer static files (als je die hebt)
app.use(express.static(path.resolve("./public")));
app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});
