
import { Booking } from "../models/booking.model.js";
import { Doctor } from "../models/Doctor.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createDoctor = asyncHandler(async(req,res)=>{
    const {name,specialization,email,phone,workingHours,slotDuration,daysAvailable,timezone} = req.body;
    if(!name || !specialization || !email || !workingHours || !slotDuration || !daysAvailable){
        return res.status(400).json({message: "All fields are required"});
    }
    const doctor = await Doctor.create({name,specialization,email,phone,workingHours,slotDuration,daysAvailable,timezone});
    return res.status(201).json({message: "Doctor created successfully", doctor});
});

const getAppointments = asyncHandler(async(req,res)=>{
    const {doctorId} = req.params;
    const doctor = await Doctor.findById(doctorId);
    if(!doctor) {
        return res.status(404).json({message: "Doctor not found"});
    }
    const appointments = await Booking.find({doctorId: doctorId}).populate("patientId","username email");
    return res.status(200).json({message: "Appointments retrieved successfully", appointments});
});

export { createDoctor, getAppointments };
