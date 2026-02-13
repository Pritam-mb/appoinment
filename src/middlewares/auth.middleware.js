import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import apierror from "../utils/apierror.js";

export const verifyJWT = asyncHandler(async(req, res, next)=>{
    try{
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ",""); // getting token from cookies or headers
     if(!token) {
        throw new apierror(401,"Unauthorized: No token provided");
     }
     const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // verify token
    const user = await User.findById(decode._id).select("-password -refreshToken"); // find user by id from token
    if(!user){
        throw new apierror(401,"Unauthorized: User not found");
    }
    req.user = user; // attach user to request object
    next(); // pass to next middleware
    }catch(error){
        if(error.name === "JsonWebTokenError"){
            return res.status(401).json({message:"Unauthorized: Invalid token"});
        }
        throw error;
    }
});