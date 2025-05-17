import jwt from "jsonwebtoken";

export const adminAuthentication = async (req, res, next) => {
  try {
    const admin = req.headers;

    if (!admin?.token) {
      res.status(401).json({ message: "Invalid Access" });
    }
    const decode_token = await jwt.verify(
      admin.token,
      process.env.ACCESS_TOKEN_KEY
    );

    if (!decode_token) {
      res.status(401).json({ message: "Invalid Access" });
    }
    req.admin = decode_token.id;
    next();
  } catch (error) {
    console.log(error);
  }
};
