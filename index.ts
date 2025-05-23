import express from "express";
import path from "path";
import { fileURLToPath } from "url";  // Needed for __dirname workaround
import clubsRouter from "./routes/clubs.js";
import spelersRouter from "./routes/spelers.js";
import { connectDB } from "./db.js";
import fetch from "node-fetch";
import { Club } from "./models/Club.js";
import Speler from './models/Speler.js';



// ESM workaround for __dirname:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/clubs", clubsRouter);
app.use("/spelers", spelersRouter);

async function initializeData() {
  const count = await Club.countDocuments();
  if (count === 0) {
    console.log("Geen clubs in DB, data ophalen en importeren...");
    const response = await fetch("https://raw.githubusercontent.com/AdamRochdi/la-liga-WebOntwikkeling/refs/heads/main/public/clubs.json");
    const clubs = await response.json();
    await Club.insertMany(clubs);
    console.log("Data geïmporteerd in MongoDB.");
  } else {
    console.log("Data al aanwezig in database.");
  }
}

async function initializeSpelers() {
  const count = await Speler.countDocuments();
  if (count === 0) {
    console.log("Geen spelers in DB, data ophalen en importeren...");
    const response = await fetch("https://raw.githubusercontent.com/AdamRochdi/la-liga-WebOntwikkeling/refs/heads/main/public/spelers.json");
    const spelers = await response.json();
    await Speler.insertMany(spelers);
    console.log("Spelers geïmporteerd in MongoDB.");
  } else {
    console.log("Spelers al aanwezig in database.");
  }
}



(async () => {
  await connectDB();
  await initializeData();
  await initializeSpelers();

  app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
  });
})();
