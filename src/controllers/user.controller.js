import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUserService, getUserByEmailService, updatePasswordService } from "../models/user.model.js"; 
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import { deleteRefreshToken, getRefreshToken } from "../models/token.model.js";

export const registerUser = async (req, res, next) => {
    try {
        const {email, password} = req.body; 
        console.log(email, password)
        if(!email || !password){
            console.log("Email and password is required");
            return res.status(400).json({
                status: 400,
                message: "Email and password is required"
            })
        };
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log(hashedPassword)

        const newUser = await createUserService(email, hashedPassword);

        console.log(newUser)

        res.status(201).json({
            status: 200,
            message: "User is registered successfully",
            user: newUser
        })


    } catch(err) {
        console.error("Unable to register the user", err);
        next(err);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        console.log(email, password)
        if(!email || !password){
            console.log("Email and password is required");
            return res.status(400).json({
                status: 400,
                message: "Email and password is required"
            })
        };

        const existingUser = await getUserByEmailService(email);
        const passwordHash = existingUser.password
        const isPasswordMatched = await bcrypt.compare(password, passwordHash);
        
       

        if(isPasswordMatched){
           const userCredentials = { email }
           const accessToken = generateAccessToken(userCredentials);
           const refreshToken = generateRefreshToken(userCredentials);
            
            res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
            path: '/',
            });
            
          return res.status(200).json({
                status: "success",
                message: "User is retrieved successfully.",
                accessToken: accessToken,
            });
        } else {
            res.status(400).json({
                status: 400,
                message: "Password doesn't matched."
            });
        }

    } catch (err) {
        console.error("Login failed: ", err);
        next(err);
    }
}

export const refreshTokenController =  async (req, res) => {
  const token = req.cookies.refreshToken;
  const doesTokenExist = await getRefreshToken(token)
  if (!token || !doesTokenExist) return res.sendStatus(403);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
     
    const accessToken = generateAccessToken({ email: user.email, });
    res.json({ accessToken });
  });
};

export const forgotPassword = async (req, res, next) => {
    try {
        const {email, new_password} = req.body;

        if(!email || !new_password){
            return res.status(400).json({
                status  : "error",
                message: "Email and password is required."
            });
        }

        //Encrypting the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(new_password, saltRounds);
        const userToUpdate = await updatePasswordService(hashedPassword, email);

        if(userToUpdate){
            return res.status(200).json({
                status: 200,
                message: "The password has been reset successfully"
            });
        } else {
            return res.status(400).json({
                status: 400,
                message:'Invalid or expired reset token'
            });
        }

    } catch (err) {
        console.error("Unable to reset the password:", err);
        next(err)
    }
}

export const logOutController = async (req, res) => {
  const token = req.cookies.refreshToken;
  await deleteRefreshToken({token: token});
  res.clearCookie('refreshToken', { path: '/user/refresh' });
  res.sendStatus(204);
};
