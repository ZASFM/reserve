import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();

router.route('/:hotelId').post(verifyAdmin,createRoom);
//update
router.route('/:id').put(verifyAdmin,updateRoom);
router.route('/availability/:id').put(updateRoomAvailability);
//delete
router.route('/:id/:hotelId').delete(verifyAdmin,deleteRoom);
//get
router.route('/:id').get(getRoom);
//getall
router.route('/').get(getRooms);

export default router;