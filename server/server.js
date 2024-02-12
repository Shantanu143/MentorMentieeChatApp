import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import connectDb from "./db/connectDb.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


//app.get('/', (req, res) => {
//res.send("hi i am shantanu")
//})

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);


app.listen(PORT, () => {
  connectDb();
  console.log(`app is runing on port ${PORT}`)

});
