import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;

export async function connectMongoDB() {
    try {
        await mongoose.connect(uri);

        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}
