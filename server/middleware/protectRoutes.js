import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const protectRoutes = async (req, res, next) => {
  try {

    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "Unothorized - No token Provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRATE);

    if (!decode) {
      return res.status(401).json({ error: "Unothorized - Invalid Token" });
    }

    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protect Routes middleware", error.message);
    res.status(500).json({ error: "Internal server error " });
  }
}

export default protectRoutes;
