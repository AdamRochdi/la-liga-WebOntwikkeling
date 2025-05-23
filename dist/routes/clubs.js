import { Router } from "express";
import { Club } from "../models/Club.js"; // Named import voor Club en IClub
const router = Router();
router.get("/", async (req, res) => {
    try {
        let clubs = await Club.find();
        const filter = req.query.filter || "";
        if (filter) {
            clubs = clubs.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
        }
        const sortField = req.query.sortField || "name";
        const sortOrder = req.query.sortOrder || "asc";
        clubs.sort((a, b) => {
            let aField = a[sortField];
            let bField = b[sortField];
            if (typeof aField === "string")
                aField = aField.toLowerCase();
            if (typeof bField === "string")
                bField = bField.toLowerCase();
            if (aField < bField)
                return sortOrder === "asc" ? -1 : 1;
            if (aField > bField)
                return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
        res.json({ clubs, filter, sortField, sortOrder });
    }
    catch (error) {
        res.status(500).send("Er is een fout opgetreden: " + error);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const club = await Club.findOne({ id: parseInt(req.params.id, 10) });
        if (!club)
            return res.status(404).send("Club niet gevonden");
        res.json(club);
    }
    catch (error) {
        res.status(500).send("Er is een fout opgetreden: " + error);
    }
});
router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updateData = req.body;
        // Alleen deze velden mogen geüpdatet worden
        const allowedFields = ["name", "stadium", "founded", "isChampion"];
        const filteredData = {};
        for (const key of allowedFields) {
            if (updateData[key] !== undefined) {
                filteredData[key] = updateData[key];
            }
        }
        const updatedClub = await Club.findOneAndUpdate({ id }, filteredData, { new: true });
        if (!updatedClub)
            return res.status(404).send("Club niet gevonden");
        res.json(updatedClub);
    }
    catch (error) {
        res.status(500).send("Er is een fout opgetreden: " + error);
    }
});
export default router;
