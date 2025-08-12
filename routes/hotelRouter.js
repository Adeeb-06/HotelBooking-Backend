import express from 'express';

import { createHotel, isHotelOwner, loginHotel, logoutHotel } from '../controllers/hotelController.js';
import upload from '../middleware/uploadMiddleware.js';
import { hotelAuth } from '../middleware/hotelAuth.js';


const hotelRouter = express.Router();

hotelRouter.post('/create-hotel',upload.single('image'), createHotel);
hotelRouter.post('/login-hotel', loginHotel);
hotelRouter.post('/logout-hotel', logoutHotel);
hotelRouter.get('/is-hotel-owner', hotelAuth, isHotelOwner);

export default hotelRouter;

