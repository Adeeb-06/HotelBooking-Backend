import express from 'express';

import { createRoom } from '../controllers/roomController.js';
import { hotelAuth } from '../middleware/hotelAuth.js';
import upload from '../middleware/uploadMiddleware.js';


const roomRouter = express.Router();

roomRouter.post('/create-room', upload.array('images' , 4), createRoom);

export default roomRouter;
