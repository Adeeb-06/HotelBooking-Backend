import express from 'express';

import { createRoom, getRoomByBookingId, getRoomById, getRooms } from '../controllers/roomController.js';
import { hotelAuth } from '../middleware/hotelAuth.js';
import upload from '../middleware/uploadMiddleware.js';


const roomRouter = express.Router();

roomRouter.post('/create-room', hotelAuth, upload.array('images' , 4), createRoom);
roomRouter.get('/get-rooms', hotelAuth, getRooms);
roomRouter.get('/get-room-by-booking-id/:bookingId', hotelAuth, getRoomByBookingId);
roomRouter.get('/get-room-by-id/:roomId', hotelAuth, getRoomById);

export default roomRouter;
