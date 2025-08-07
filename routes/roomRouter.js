import express from 'express';

import { createRoom } from '../controllers/roomController.js';
import { hotelAuth } from '../middleware/hotelAuth.js';


const roomRouter = express.Router();

roomRouter.post('/create-room', hotelAuth, createRoom);

export default roomRouter;
