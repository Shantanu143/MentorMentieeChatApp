import jwt from "jsonwebtoken";

const genrateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRATE, { expiresIn: '15d' })

  res.cookie("jwt", token, {
    maxAge: 20 * 24 * 60 * 60 * 1000, //ms
    httpOnly: true, //prevent xss attacks cross site scripting attacks
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  })
}

export default genrateTokenAndSetCookie; 
