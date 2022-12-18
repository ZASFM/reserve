import express from "express";
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
const router=express.Router();

//create
router.route('/').post(createHotel);
//update
router.route('/:id').put(updateHotel)
//delete
router.route('/:id').delete(deleteHotel)
//get
router.route('/:id').get(getHotel)
//getall
router.route('/').get(getHotels)

export default router;