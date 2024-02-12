import Conversation from "../model/conversationModel.js";
import Messages from "../model/messageModel.js";

export const sendMessage = async (req, res) => {

  try {
    const { messages } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      })
    }
    const newMessage = Messages({
      senderId,
      receiverId,
      messages,
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //ek ke bad ek run hoga 
    //await conversation.save();
    //await newMessage.save();

    //this will run parlaly
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in send Message Controller", error.message)
    res.status(500).json({ error: "Internal server error" })

  }

}
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user_id;

    // Find the conversation where both senderId and userToChatId are participants,
    // and populate the messages field
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate("messages");

    // If no conversation is found, return an empty array
    if (!conversation || !conversation.messages || conversation.messages.length === 0) {
      return res.status(200).json({ messages: [] });
    }

    // If conversation is found, retrieve and return its messages
    const messages = conversation.messages;
    return res.status(200).json({ messages });

  } catch (error) {
    // Log and handle errors
    console.log("Error in getMessage Controller:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
