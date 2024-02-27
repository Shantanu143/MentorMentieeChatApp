import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        const uri = "mongodb+srv://admin:admin@mentormentieechatapp.vyntdxt.mongodb.net/cd";
        if (!uri) {
            throw new Error("MongoDB URI not found in environment variables");
        }

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectToMongoDB;
