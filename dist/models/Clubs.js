import mongoose, { Schema } from "mongoose";
const ClubSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    stadium: { type: String, required: true },
    founded: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    isChampion: { type: Boolean, required: true }
});
export const Club = mongoose.model("Club", ClubSchema);
