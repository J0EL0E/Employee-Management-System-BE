import "dotenv/config";
import jwt from "jsonwebtoken"
import { getUserByEmailService } from "../models/user.model.js";

export const authMiddleware = async (req, res, next)  => {
    const authHeaders  = req.headers.authorization;
    let token;

    if(authHeaders){
        try{
            console.log("Authenticating the bearer token...")
            token = authHeaders.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if(!decoded) return res.status(401).json({ message: "Failed to verify the token" });

            req.user = await getUserByEmailService(decoded.email)
            
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();

        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }
    }
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

}
