import express from 'express';
import { createBooking } from '../controllers/bookingController.js';
import { hotelAuth } from '../middleware/hotelAuth.js';


const bookingRouter = express.Router();

bookingRouter.post('/create-booking', hotelAuth, createBooking);

export default bookingRouter;
