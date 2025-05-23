import { Router } from "express";
import Speler from "../models/Speler.js";
import { Types } from "mongoose";
const router = Router();
// Lijst van spelers ophalen met filter en sortering uit MongoDB
router.get("/", async (req, res) => {
    try {
        const filter = req.query.filter || "";
        const sortField = req.query.sortField || "name";
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
        const query = filter
            ? { name: { $regex: filter, $options: "i" } }
            : {};
        const spelers = await Speler.find(query)
            .sort({ [sortField]: sortOrder })
            .lean();
        res.json({ spelers, filter, sortField, sortOrder: sortOrder === 1 ? "asc" : "desc" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fout bij ophalen spelers" });
    }
});
// Speler detail ophalen (JSON)
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Ongeldig ID" });
        }
        const speler = await Speler.findById(id).lean();
        if (!speler) {
            return res.status(404).json({ error: "Speler niet gevonden" });
        }
        res.json(speler);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fout bij ophalen speler" });
    }
});
// Edit pagina tonen (EJS render)
router.get("/:id/edit", async (req, res) => {
    try {
        const id = req.params.id;
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Ongeldig ID" });
        }
        const speler = await Speler.findById(id).lean();
        if (!speler) {
            return res.status(404).json({ error: "Speler niet gevonden" });
        }
        res.render("speler-edit", { speler });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fout bij ophalen speler voor bewerken" });
    }
});
// Edit POST: speler updaten in MongoDB
router.post("/:id/edit", async (req, res) => {
    try {
        const id = req.params.id;
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Ongeldig ID" });
        }
        const { name, age, position, isActive, description, birthdate, hobbies, imageUrl, } = req.body;
        const updateData = {
            name,
            age: age ? Number(age) : undefined,
            position,
            isActive: isActive === "true",
            description,
            birthdate: birthdate ? new Date(birthdate) : undefined,
            imageUrl,
            hobbies: hobbies ? hobbies.split(",").map((h) => h.trim()) : undefined,
        };
        // Verwijder undefined velden, zodat ze niet overschrijven
        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });
        await Speler.findByIdAndUpdate(id, updateData);
        res.redirect(`/spelers/${id}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fout bij updaten speler" });
    }
});
export default router;
