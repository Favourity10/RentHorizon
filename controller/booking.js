
import bookingService from '../services/booking.js';

const bookingController = {
    createBooking: async (req, res) => {
        try {
            const { apartmentId, checkInDate, checkOutDate, numberOfGuests } = req.body;

            // Input validation
            if (!apartmentId || !checkInDate || !checkOutDate || !numberOfGuests) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            const checkIn = new Date(checkInDate);
            const checkOut = new Date(checkOutDate);
            if (isNaN(checkIn) || isNaN(checkOut)) {
                return res.status(400).json({ success: false, message: 'Invalid date format' });
            }
            if (checkIn >= checkOut) {
                return res.status(400).json({ success: false, message: 'Check-in date must be before check-out date' });
            }

            
            const booking = await bookingService.createBooking(req.user._id, {
                apartmentId, checkInDate, checkOutDate, numberOfGuests
            });

            res.status(201).json({
                success: true,
                message: 'Booking created successfully',
                data: booking
            });

        } catch (error) {
            console.error('Create booking error:', error);
            res.status(400).json({ success: false, message: error.message });
        }
    },

    getBookingById: async (req, res) => {
        try {
            const booking = await bookingService.getBookingById(req.params.id);
            if (!booking) {
                return res.status(404).json({ success: false, message: 'Booking not found' });
            }

            if (req.user.role !== 'admin' && booking.userId._id.toString() !== req.user._id.toString()) {
                return res.status(403).json({ success: false, message: 'Access denied' });
            }

            res.status(200).json({ success: true, data: booking });

        } catch (error) {
            console.error('Get booking error:', error);
            res.status(400).json({ success: false, message: error.message });
        }
    },

    cancelBooking: async (req, res) => {
        try {
            const booking = await bookingService.cancelBooking(req.params.id);

            if (req.user.role !== 'admin' && booking.userId._id.toString() !== req.user._id.toString()) {
                return res.status(403).json({ success: false, message: 'Access denied' });
            }

            res.status(200).json({
                success: true,
                message: 'Booking cancelled successfully',
                data: booking
            });

        } catch (error) {
            console.error('Cancel booking error:', error);
            res.status(400).json({ success: false, message: error.message });
        }
    },

    getAllBookings: async (req, res) => {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({ success: false, message: 'Admin access required' });
            }

            const data = await bookingService.getAllBookings(req.query);
            res.status(200).json({ success: true, data });

        } catch (error) {
            console.error('Get all bookings error:', error);
            res.status(400).json({ success: false, message: error.message });
        }
    }
};

export default bookingController;
