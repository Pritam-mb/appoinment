import { Booking } from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createbooking = asyncHandler(async(req,res)=>{
    const {doctorId,patientId,appointmentDate,appointmentTime} = req.body;
    if(!doctorId || !patientId || !appointmentDate || !appointmentTime){
        return res.status(400).json({message: "All fields are required"});
    }
    const booking = await Booking.create({
        doctorId, 
        patientId, 
        appointmentDate, 
        appointmentTime,
        confirmationId: 'APT' + Math.random().toString(36).substr(2, 9).toUpperCase()
    });
    return res.status(201).json({message: "Booking created successfully", booking});
})

export {createbooking};