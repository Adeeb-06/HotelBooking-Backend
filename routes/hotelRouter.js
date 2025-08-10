import express from 'express';

import { createHotel, loginHotel } from '../controllers/hotelController.js';
import upload from '../middleware/uploadMiddleware.js';


const hotelRouter = express.Router();

hotelRouter.post('/create-hotel',upload.single('image'), createHotel);
hotelRouter.post('/login-hotel', loginHotel);

export default hotelRouter;

