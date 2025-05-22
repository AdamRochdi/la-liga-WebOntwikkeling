import { Router } from "express";
import fetch from "node-fetch";
const router = Router();
const SPELERS_JSON_URL = "https://raw.githubusercontent.com/AdamRochdi/la-liga-WebOntwikkeling/refs/heads/main/spelers.json";
router.get("/", async (req, res) => {
    try {
        const response = await fetch(SPELERS_JSON_URL);
        if (!response.ok)
            throw new Error("Failed to fetch spelers data");
        // Type assertion toevoegen:
        let spelers = (await response.json());
        const filter = req.query.filter || "";
        if (filter) {
            spelers = spelers.filter((s) => s.name.toLowerCase().includes(filter.toLowerCase()));
        }
        const sortField = req.query.sortField || "name";
        const sortOrder = req.query.sortOrder || "asc";
        spelers.sort((a, b) => {
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
        res.json({ spelers, filter, sortField, sortOrder });
    }
    catch (error) {
        res.status(500).send("Er is een fout opgetreden: " + error);
    }
});
router.get("/:id", async (req, res) => {
    try {
        const response = await fetch(SPELERS_JSON_URL);
        if (!response.ok)
            throw new Error("Failed to fetch spelers data");
        const data = await response.json();
        if (!Array.isArray(data)) {
            return res.status(500).send("Dataformaat is ongeldig.");
        }
        const spelers = data;
        const speler = spelers.find((s) => s.id === parseInt(req.params.id, 10));
        if (!speler)
            return res.status(404).send("Speler niet gevonden");
        res.json(speler);
    }
    catch (error) {
        res.status(500).send("Er is een fout opgetreden: " + error);
    }
});
export default router;
