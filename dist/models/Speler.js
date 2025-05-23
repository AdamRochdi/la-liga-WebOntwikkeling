import mongoose, { Schema } from 'mongoose';
const SpelerSchema = new Schema({
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
export default mongoose.model('Speler', SpelerSchema);
