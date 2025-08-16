import express from 'express';

import { createRoom, getRooms } from '../controllers/roomController.js';
import { hotelAuth } from '../middleware/hotelAuth.js';
import upload from '../middleware/uploadMiddleware.js';


const roomRouter = express.Router();

roomRouter.post('/create-room', hotelAuth, upload.array('images' , 4), createRoom);
roomRouter.get('/get-rooms', hotelAuth, getRooms);

export default roomRouter;
