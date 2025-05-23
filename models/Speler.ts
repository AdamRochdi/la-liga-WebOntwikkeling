import mongoose, { Schema, Document } from 'mongoose';

export interface ISpeler extends Document {
    name: string;
    description?: string;
    age?: number;
    isActive?: boolean;
    birthdate?: Date;
    imageUrl?: string;
    position?: string;
    hobbies?: string[];
    team?: {
        id: number;
        name: string;
        stadium?: string;
        founded?: number;
        imageUrl?: string;
        isChampion?: boolean;
    };
}

const SpelerSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    age: { type: Number },
    isActive: { type: Boolean },
    birthdate: { type: Date },
    imageUrl: { type: String },
    position: { type: String },
    hobbies: { type: [String] },
    team: {
        id: { type: Number },
        name: { type: String },
        stadium: { type: String },
        founded: { type: Number },
        imageUrl: { type: String },
        isChampion: { type: Boolean }
    }
});

export default mongoose.model<ISpeler>('Speler', SpelerSchema);
