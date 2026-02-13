import { request,response } from "express";
import { User } from "../models/User.model";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { apiresponse } from "../utils/apiresponse";
import apierror from "../utils/apierror";


const generateTokens = (userid) => {
    const user = User.findone(
        {userid}
    )
    if(!user){
        return null;
    }
    const accessToken = User.generateAccessToken();
    const refreshToken = User.generateRefreshToken();
    user.refreshToken = refreshToken;
    user.save({validateBeforeSave: false});
    return {accessToken,refreshToken}
}
const registeruser = asyncHandler(async(request,res)=>{
    const {username,email,password} = request.body;
    if(!username || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }
    const user = await User.findbyemail(email);
    if(user){
        return res.status(400).json({message: "User already exists"});
    }
    const newuser = await User.create({email,username,password});
    const accessToken = newuser.generateAccessToken();
    const refreshToken = newuser.generateRefreshToken();
    const createuser = await User.findById(newuser._id).select("-password -refreshToken") // thsi is final of user
    return apiresponse(202,createuser,"User registered successfully")

})
const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new apierror(400,"Email and password are required")
    }
    const user = await User.findbyemail(email);
    if(!user){
        throw new apierror(400,"Invalid credentials")
    }
    const ispasswordmatch = await user.ispasswordmatch(password);
    if(!ispasswordmatch){
        throw new apierror(400,"Invalid credentials")
    }
    const {accessToken,refreshToken} = generateTokens(user._id);
    const loggedinuser = await findById(user._id).select("-password -refreshToken");
      return res.status(200)
            .cookie("refreshToken", refreshToken, options) // we are storing refresh token in cookie so that it is not accessible from frontend
            .cookie("accessToken", accessToken, options)
            .json(
                new apiresponse(200, {
                    user: loggedinuser,
                    accessToken,refreshToken
                })
            )
})