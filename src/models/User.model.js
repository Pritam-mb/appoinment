import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        // unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmmationId:{
        type: String,
    },
    refreshToken: {
        type: String,
    },
},{
    timestamps: true,
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

userSchema.methods.ispasswordmatch
= async function (password) {
    if(!password) return false;
    return await bcrypt.compare(password, this.password); //
}
userSchema.methods.generateAccessToken = function(){  // for generating token
    return jwt.sign({
        _id : this._id,
        email: this.email,
        username: this.username,},
        // fullname: this.fullname,},
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d"
    })
}
userSchema.methods.generateRefreshToken = function(){ //longlived
     return jwt.sign({
        _id : this._id,
       },
    process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d"
    })
}
export const User = mongoose.model('User', userSchema);