import express from "express";
const router = express.Router()

import {  deleteUser, getUser, getUsers, updatedUser,  } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createError } from "../utils/error.js";


//UPDATE
router.put("/:id",verifyUser,updatedUser)
//DELETE
router.delete("/:id",verifyUser,deleteUser)
//GET 
router.get("/:id",verifyUser,getUser)
//GET ALL
router.get("/",verifyAdmin,getUsers)



export default router;