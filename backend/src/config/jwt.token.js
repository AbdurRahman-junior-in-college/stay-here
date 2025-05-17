import jwt from "jsonwebtoken";

export const generateJWTToken = async (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });

  // console.log(token);

  if (token) {
    // console.log(res.cookie("adminToken", token));
    res.cookie("admintoken", token, {
      maxAge: 7 * 24 * 60 * 60 * 100,
      httpOnly: true,
      sameSite: "strict",
    });
  }

  return token;
};
