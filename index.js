import express from "express";
import mongoose from "mongoose";
import  dotenv,{config} from "dotenv";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";

dotenv.config()
const app = express();
try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo Db connected")
  } catch (error) {
    console.log(error)
  }

  //Middleware
  app.use(cookieParser())
  app.use(express.json())
  app.use("/api/auth",authRoute)
  app.use("/api/users",usersRoute)
  app.use("/api/hotels",hotelsRoute)
  app.use("/api/rooms",roomsRoute)
  app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errorMessage = err.message || 500
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
  })
  



 app.listen(8000,()=>{
    console.log("Connected to backend")
 })