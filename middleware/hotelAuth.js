import jwt from "jsonwebtoken";

export const hotelAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if(decoded.id){
            req.body.hotelId = decoded.id;
        }else{
            return res.status(401).json({ message: "Unauthorized access" });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}