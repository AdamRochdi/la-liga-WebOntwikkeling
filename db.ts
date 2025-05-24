import mongoose from "mongoose";

// Verbind de met de database + console berichten
export async function connectDB() {
  try {
    console.log(" Trying to connect to MongoDB..");
    await mongoose.connect("mongodb+srv://La-Liga:04052005@cluster0.d7ozhv2.mongodb.net/la-liga?retryWrites=true&w=majority&appName=Cluster0");
    console.log(" MongoDB connected.");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
}
