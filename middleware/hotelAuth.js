import jwt  from "jsonwebtoken";

export const hotelAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.hotelId = decoded.id;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized access" });
    }
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
