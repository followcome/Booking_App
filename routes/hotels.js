import express, { Router } from "express";

import { createHotel, deleteHotel, getHotel, getHotels, updatedHotel,  } from "../controllers/hotels.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createError } from "../utils/error.js";
const router = express.Router()
//CREATE 
router.post("/",verifyAdmin,createHotel);
//UPDATE
router.put("/:id",verifyAdmin,updatedHotel)
//DELETE
router.delete("/:id",verifyAdmin,deleteHotel)
//GET 
router.get("/:id",getHotel)
//GET ALL
router.get("/",getHotels)



export default router;