import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  messages: {
    type: String,
    require: true,
  },
}, { timestamps: true })

const Messages = mongoose.model("Messages", messagesSchema);
export default Messages;
