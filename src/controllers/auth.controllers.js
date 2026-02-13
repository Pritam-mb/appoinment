import { request,response } from "express";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiresponse } from "../utils/apiresponse.js";
import apierror from "../utils/apierror.js";


const generateTokens = async (userId) => {
    const user = await User.findById(userId);
    if(!user){
        return null;
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});
    return {accessToken,refreshToken};
}
const registeruser = asyncHandler(async(request,res)=>{
    const {username,email,password} = request.body;
    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists"});
    }
    const newuser = await User.create({email,username,password});
    const accessToken = newuser.generateAccessToken();
    const refreshToken = newuser.generateRefreshToken();
    const createuser = await User.findById(newuser._id).select("-password -refreshToken") // thsi is final of user
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: createuser,
        accessToken,
        refreshToken
    });

})

const login = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;
    if(!email || !password){
        throw new apierror(400,"Email and password are required")
    }
    const user = await User.findOne({email});
    if(!user){
        throw new apierror(400,"Invalid credentials")
    }
    const ispasswordmatch = await user.ispasswordmatch(password);
    if(!ispasswordmatch){
        throw new apierror(400,"Invalid credentials")
    }
    const {accessToken,refreshToken} = await generateTokens(user._id);
    const loggedinuser = await User.findById(user._id).select("-password -refreshToken");
      const options = {
        httpOnly: true,
        secure: true
      };
      return res.status(200)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json({
                success: true,
                user: loggedinuser,
                accessToken,
                refreshToken
            })
})

export { registeruser, login };