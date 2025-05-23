import { Router, Request, Response } from "express";
import { Club, IClub } from "../models/Club.js";  

const router = Router();

// Lijst van Clubs ophalen (+ filter en sortering) uit MongoDB
router.get("/", async (req: Request, res: Response) => {
    try {
        let clubs: IClub[] = await Club.find();

        const filter = (req.query.filter as string) || "";
        if (filter) {
            clubs = clubs.filter(c =>
                c.name.toLowerCase().includes(filter.toLowerCase())
            );
        }

        const sortField = (req.query.sortField as keyof IClub) || "name";
        const sortOrder = (req.query.sortOrder as string) || "asc";

        clubs.sort((a, b) => {
            let aField = a[sortField] as string | number;
            let bField = b[sortField] as string | number;

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

// Club detail ophalen (JSON)
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const club = await Club.findOne({ id: parseInt(req.params.id, 10) });
        if (!club) return res.status(404).send("Club niet gevonden");
        res.json(club);
    } catch (error) {
        res.status(500).send("Er is een fout opgetreden: " + error);
    }
});

//Update club op ID
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const updateData = req.body;

        const allowedFields: (keyof IClub)[] = ["name", "stadium", "founded", "isChampion"];
        const filteredData: Partial<IClub> = {};
        for (const key of allowedFields) {
            if (updateData[key] !== undefined) {
                filteredData[key] = updateData[key];
            }
        }

        const updatedClub = await Club.findOneAndUpdate({ id }, filteredData, { new: true });
        if (!updatedClub) return res.status(404).send("Club niet gevonden");
        res.json(updatedClub);
    } catch (error) {
        res.status(500).send("Er is een fout opgetreden: " + error);
    }
});

export default router;
