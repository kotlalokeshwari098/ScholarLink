import jwt from "jsonwebtoken";

export const verifyLogin = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id);
    req.userId = decoded.id;
    console.log(req.userId);
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
