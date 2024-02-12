import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("connection succeful")
  } catch (error) {
    console.log("Error to connecting mongodb", error.message);
  }
}

export default connectDb;
