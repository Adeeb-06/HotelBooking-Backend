import express from 'express';
import { createBooking, deleteBooking, getBookingById, getBookings, updateBooking } from '../controllers/bookingController.js';
import { hotelAuth } from '../middleware/hotelAuth.js';


const bookingRouter = express.Router();

bookingRouter.post('/create-booking', hotelAuth, createBooking);
bookingRouter.get('/get-bookings', hotelAuth, getBookings);
bookingRouter.get('/get-booking-by-id/:bookingId', hotelAuth, getBookingById);
bookingRouter.put('/update-booking/:bookingId', hotelAuth, updateBooking);
bookingRouter.delete('/delete-booking/:bookingId', hotelAuth, deleteBooking);

export default bookingRouter;
