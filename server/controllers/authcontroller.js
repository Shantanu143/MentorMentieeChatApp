import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import genrateTokenAndSetCookie from "../utils/genrateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullname, username, password, conformPassword, gender } = req.body;

    if (password !== conformPassword) {
      return res.status(400).json({ error: "Password don't match" })
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: " User name is already existed " })
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);


    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashPassword,
      gender,
      profilepic: gender === "male" ? boyProfilePic : girlProfilePic,
    })



    if (newUser) {
      //genrate gwt token 
      genrateTokenAndSetCookie(newUser._id, res)

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilepic
      });
    } else {
      res.status(400).json({ error: "Invalid user data" })
    }



  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server Error" })
  }
}


export const login = async (req, res) => {
  try {

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordIsCorrect = await bcrypt.compare(password, user?.password || "")

    if (!user || !isPasswordIsCorrect) {
      return res.status(400).json({ error: "Invalid username or password" })
    }

    genrateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilepic
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server Error" })
  }
}


export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ message: "Succefully log out" })
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server Error" })
  }
}
