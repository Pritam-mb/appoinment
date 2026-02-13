import mongoose from "mongoose";
const timeSlotSchema = new mongoose.Schema({
    date:{
        type: Date,
        required: true,
        
    }
})