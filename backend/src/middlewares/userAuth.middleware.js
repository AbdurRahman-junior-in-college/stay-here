import jwt from "jsonwebtoken";

export const userAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Un Auth Access" });
    }

    const decode_token = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    if (!decode_token) {
      return res
        .status(403)
        .json({ success: false, message: "Un Auth Access" });
    }

    req.user = decode_token;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Internal Error ${error.message}` });
  }
};
