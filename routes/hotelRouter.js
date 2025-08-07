import express from 'express';

import { createHotel, loginHotel } from '../controllers/hotelController.js';


const hotelRouter = express.Router();

hotelRouter.post('/create-hotel', createHotel);
hotelRouter.post('/login-hotel', loginHotel);

export default hotelRouter;

