import { request,response } from "express";
import { User } from "../models/User.model";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";

const registeruser = asyncHandler(async(request,res)=>{
    const {username,email,password} = request.body;
})