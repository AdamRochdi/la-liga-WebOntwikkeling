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
        tla: { type: String },
        crest: { type: String },
    }
});
export default mongoose.model('Speler', SpelerSchema);
