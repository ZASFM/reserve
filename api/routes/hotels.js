import express from "express";
import { countByCities, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
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
router.route('/find/:id').get(getHotel)
//getall
router.route('/').get(getHotels)
router.route('/countByCity').get(countByCities)
router.route('/countByType').get(countByType)
router.route('/room/:id').get(getHotelRooms)

export default router;