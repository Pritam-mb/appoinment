import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    confirmationId:{
        type: String,
        required: true,
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    customerName:{
        type: String,
        required: true,
    },
    customerEmail:{
        type: String,
        required: true,
    },
    customerPhone:{
        type: String,
        required: true,
    },
    appointmentDate:{
        type: Date,
        required: true,
    },
    appointmentTime:{
        type: String,
        required: true,
    },
        service:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending",
        }
},{
    timestamps: true,
});

// Auto-generate confirmation ID if not provided
bookingSchema.pre('save', async function(next) {
    if (!this.confirmationId) {
        this.confirmationId = 'APT' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
    next();
});

export const Booking = mongoose.model('Booking', bookingSchema);