import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not aunthenticated!"))
    }
    jwt.verify(token,process.env.Jwt,(err,user)=>{
        if(err)return next(createError(403,"token not valid"));
        req.user = user;
        next();
    })

}
export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,()=>{
        
        if(req.user.id ===req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorized!"))
        }
    })
}
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorized!"))
        }
    })
}
