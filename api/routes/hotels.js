import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();

//create, only admin can create, delete and update, so before i have to check that im admin
router.route('/').post(verifyAdmin,createHotel);
//update
router.route('/:id').put(verifyAdmin,updateHotel)
//delete
router.route('/:id').delete(verifyAdmin,deleteHotel)
//get
router.route('/:id').get(getHotel)
//getall
router.route('/').get(getHotels)

export default router;