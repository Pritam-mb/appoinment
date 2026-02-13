import mongoose from "mongoose";

const bookingSchema =new mongoose.Schema({
    conformationId:{
        type: String,
        required: true, },
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        customername:{
            type:String,
            required: true,        },
        customeremail:{
            type:String,
            required: true,}
            ,
        customerphone:{
            type:String,
            required: true,        },
        appoimentdate:{
            type: Date,
            required: true,        },
        appoimenttime:{
            type: String,
            required: true,        },
        service:{
            type: String,
            required: true,
        },
        status:{
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        }
},{
    timestamps: true,
});

export const Booking = mongoose.model('Booking', bookingSchema);