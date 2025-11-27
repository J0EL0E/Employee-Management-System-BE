import jwt from "jsonwebtoken";
import "dotenv/config";
import { createRefreshToken } from "../models/token.model.js";

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
}

export const generateRefreshToken = async (user) => {
  try {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    await createRefreshToken(refreshToken);
    return refreshToken;
  } catch(error) {
    console.error("Failed to generate new refresh Token", error);
    throw new Error("Failed to generate new refresh Token", error);
  }
}