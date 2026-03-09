import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js"

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
        return res.status(401).json({ message: "No token, access denied" });

    try {
        const verified = jwt.verify(token, "SECRET_KEY");
        req.admin = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

export default auth;





export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
