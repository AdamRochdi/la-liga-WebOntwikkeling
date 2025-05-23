import mongoose, { Schema, Document } from "mongoose";

export interface IClub extends Document {
  id: number;
  name: string;
  stadium: string;
  founded: number;
  imageUrl: string;
  isChampion: boolean;
}

const ClubSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  stadium: { type: String, required: true },
  founded: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  isChampion: { type: Boolean, required: true }
});

export const Club = mongoose.model<IClub>("Club", ClubSchema);
