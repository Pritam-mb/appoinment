// import mongoose from "mongoose";
// import {DB_NAME} from  "./constant.js";
import app from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env",
});
console.log("🔧 Environment loaded. PORT:", process.env.PORT);
console.log("🔧 MONGO_URI:", process.env.MONGO_URI ? "SET" : "NOT SET");
// const a = require(FileSystem)
connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`🚀 Server is running on port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.error("Failed to connect to the database. Server not started.", error);
});
// (
//     async()=>{
//         try{
//             await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//             console.log("Database connected successfully");
//         }
//         catch(error){
//             console.error("Database connection failed:", error.message);
//             process.exit(1);
//         }
//     }
// )()