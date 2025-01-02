
import User from "../models/user.js"
import { createError } from "../utils/error.js";

export const updatedUser =async(req,res,next)=>{
    
    try{
    
      const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {$set:req.body},
        {new:true}
      ).select("-password -isAdmin");
      
        res.status(200).json(updatedUser);
    }catch(err){
        console.log(err)
        next(err);
    }

}
export const deleteUser =async(req,res,next)=>{
    try{
      const  deleteUser= await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        
        next(err);
    }

}

export const getUser = async(req,res,next)=>{
    try{
        const getUser = await User.findById(req.params.id).select("-password -isAdmin")
        res.status(200).json(getUser)

    }catch(err){
        next(err)
    }
}
export const getUsers = async(req,res,next)=>{
    try{
        const getUsers = await User.find()
        res.status(200).json(getUsers).select("-password -isAdmin")
    }catch(err){
        next(err)
    }
}