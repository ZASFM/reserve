import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router=express.Router();

router.route('/:hotelId').post(verifyAdmin,createRoom);
//update
router.route('/:id').put(verifyAdmin,updateRoom)
//delete
router.route('/:id/:hotelId').delete(verifyAdmin,deleteRoom)
//get
router.route('/:id').get(getRoom)
//getall
router.route('/').get(getRooms)

export default router;