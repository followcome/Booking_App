import User from "../models/user.js";
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const register=async(req,res,next)=>{
    
    try{
        // new password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password,salt)
        //CREATE USER
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash

        });
        await newUser.save()
        res.status(200).json(newUser);
    }catch(err){
        next(err)
    }

}
export const login=async(req,res,next)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found"))
            const validUser = await bcrypt.compare(req.body.password,user.password)
        if(!validUser) return next(createError(400,"Wrong password"))
            const {password,isAdmin,...otherInformation}= user._doc
     const token=   jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
            res.cookie("access_token",token,{
                httpOnly:true,
            }).status(200).json({...otherInformation})
    }catch(err){
        next(err)
    }
    
}

