import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import clubsRouter from "./routes/clubs.js";
import spelersRouter from "./routes/spelers.js";
import { connectDB } from "./db.js";
import fetch from "node-fetch";
import { Club } from "./models/Club.js";
import Speler from './models/Speler.js';
import bcrypt from "bcrypt";



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
    console.log("Geen clubs geven onder in DB");
    const response = await fetch("https://raw.githubusercontent.com/AdamRochdi/la-liga-WebOntwikkeling/refs/heads/main/public/clubs.json");
    const clubs = await response.json();
    await Club.insertMany(clubs);
    console.log("Data succesvol geimporteerd naar de MongoDb database");
  } else {
    console.log("Data al aanwezig");
  }
}

async function initializeSpelers() {
  const count = await Speler.countDocuments();
  if (count === 0) {
    console.log("Geen spelers gevonden in DB");
    const response = await fetch("https://raw.githubusercontent.com/AdamRochdi/la-liga-WebOntwikkeling/refs/heads/main/public/spelers.json");
    const spelers = await response.json();
    await Speler.insertMany(spelers);
    console.log("Spelers succesvol geimporteerd naar de MongoDb database");
  } else {
    console.log("Spelers al aanwezig");
  }
}

// async function initializeUsers() {
//   const adminExists = await User.findOne({ username: "admin" });
//   const userExists = await User.findOne({ username: "user" });

//   if (!adminExists) {
//     const hashedPassword = await bcrypt.hash("admin123", 10);
//     await User.create({ username: "admin", password: hashedPassword, role: "ADMIN" });
//     console.log("👤 Admin gebruiker aangemaakt.");
//   }

//   if (!userExists) {
//     const hashedPassword = await bcrypt.hash("user123", 10);
//     await User.create({ username: "user", password: hashedPassword, role: "USER" });
//     console.log("👤 Gewone gebruiker aangemaakt.");
//   }
// }


(async () => {
  await connectDB();
  await initializeData();
  await initializeSpelers();
  // await initializeUsers();

  app.listen(PORT, () => {
    console.log(`Serverhost: http://localhost:${PORT}`);
  });
})();
