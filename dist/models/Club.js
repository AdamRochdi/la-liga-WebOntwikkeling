import mongoose, { Schema } from "mongoose";
// Maak het schema aan
const clubSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    stadium: { type: String, required: true },
    founded: { type: Number, required: true },
    isChampion: { type: Boolean, required: true },
});
// Export het model met een named export
export const Club = mongoose.model("Club", clubSchema);
