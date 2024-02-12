import User from "../model/userModel.js";


export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Query for users except the logged-in user
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password'); // Assuming you have a 'password' field in your user schema that you don't want to expose

    // Return the filtered users
    res.status(200).json(filteredUsers);

  } catch (error) {
    // Log and handle errors
    console.log("Error in getUsersForSideBar:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
