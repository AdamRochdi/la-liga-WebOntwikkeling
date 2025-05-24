import mongoose, { Document, Schema } from "mongoose";

// Definieer de interface voor Club
export interface IClub extends Document {
    id: number;
    name: string;
    stadium: string;
    founded: number;
    isChampion: boolean;
}

// Maakt het schema aan
const clubSchema = new Schema<IClub>({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    stadium: { type: String, required: true },
    founded: { type: Number, required: true },
    isChampion: { type: Boolean, required: true },
});

// Export het model met een named export
export const Club = mongoose.model<IClub>("Club", clubSchema);
