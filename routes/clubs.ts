import { Router, Request, Response } from "express";
import fetch from "node-fetch";
import { Team } from "../interfaces";

const router = Router();

const CLUBS_JSON_URL =
    "https://raw.githubusercontent.com/AdamRochdi/la-liga-WebOntwikkeling/refs/heads/main/public/clubs.json";

// Route voor alle clubs + filter + sortering
router.get("/", async (req: Request, res: Response) => {
    try {
        const response = await fetch(CLUBS_JSON_URL);
        if (!response.ok) throw new Error("Failed to fetch clubs data");

        let clubs = (await response.json()) as Team[];

        const filter = (req.query.filter as string) || "";
        if (filter) {
            clubs = clubs.filter((c) =>
                c.name.toLowerCase().includes(filter.toLowerCase())
            );
        }

        const sortField = (req.query.sortField as keyof Team) || "name";
        const sortOrder = (req.query.sortOrder as string) || "asc";

        clubs.sort((a, b) => {
            let aField = a[sortField];
            let bField = b[sortField];

            if (typeof aField === "string") aField = aField.toLowerCase();
            if (typeof bField === "string") bField = bField.toLowerCase();

            if (aField < bField) return sortOrder === "asc" ? -1 : 1;
            if (aField > bField) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });

        res.json({ clubs, filter, sortField, sortOrder });
    } catch (error) {
        res.status(500).send("Er is een fout opgetreden: " + error);
    }
});

// Route voor detailpagina van één club
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const response = await fetch(CLUBS_JSON_URL);
        if (!response.ok) throw new Error("Failed to fetch clubs data");

        const data = await response.json() as unknown;

        if (!Array.isArray(data)) {
            return res.status(500).send("Dataformaat is ongeldig.");
        }

        const clubs: Team[] = data;

        const club = clubs.find((c) => c.id === parseInt(req.params.id, 10));

        if (!club) return res.status(404).send("Club niet gevonden");

        res.json(club);
    } catch (error) {
        res.status(500).send("Er is een fout opgetreden: " + error);
    }
});

export default router;
