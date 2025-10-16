import express from 'express';
import { authMiddleware } from '../middleware/authmiddleware.js';
import bookingController from '../controller/booking.js';
const bookingRoute = express.Router();


bookingRoute.post('/', authMiddleware, bookingController.createBooking);
bookingRoute.get('/:id', authMiddleware, bookingController.getBookingById);
bookingRoute.put('/:id/cancel', authMiddleware, bookingController.cancelBooking);
bookingRoute.get('/', authMiddleware, bookingController.getAllBookings);



export default bookingRoute;