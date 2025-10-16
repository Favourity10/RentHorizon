
import bookingModel from '../models/booking.js';
import apartmentModel from '../models/apartment.js';

const bookingService = {
    createBooking: async (userId, { apartmentId, checkInDate, checkOutDate, numberOfGuests }) => {
        // Validate apartment
        const apartment = await apartmentModel.findById(apartmentId);
        if (!apartment) throw new Error('Apartment not found');

        // Validate number of guests
        if (numberOfGuests > apartment.maxGuests) {
            throw new Error(`Maximum ${apartment.maxGuests} guests allowed`);
        }

        // Validate availability
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const isAvailable = apartment.availability.some(period => {
            const start = new Date(period.startDate);
            const end = new Date(period.endDate);
            return checkIn >= start && checkOut <= end;
        });
        if (!isAvailable) throw new Error('Apartment not available for selected dates');

        // Calculate price
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * apartment.pricePerNight;

        // Create and save booking
        const booking = new bookingModel({
            userId,
            apartmentId,
            checkInDate: checkIn,
            checkOutDate: checkOut,
            numberOfGuests,
            totalPrice,
            status: 'confirmed'
        });

        const savedBooking = await booking.save();

        // Populate details
        return bookingModel.findById(savedBooking._id)
            .populate('apartmentId', 'title address pricePerNight')
            .populate('userId', 'firstName lastName email');
    },

    getBookingById: async (bookingId) => {
        const booking = await bookingModel.findById(bookingId)
            .populate('apartmentId', 'title address pricePerNight images')
            .populate('userId', 'firstName lastName email');
        return booking;
    },

    cancelBooking: async (bookingId) => {
        const booking = await bookingModel.findById(bookingId)
            .populate('userId', 'firstName lastName email');
        if (!booking) throw new Error('Booking not found');
        if (booking.status === 'cancelled') throw new Error('Booking already cancelled');

        booking.status = 'cancelled';
        await booking.save();

        return bookingModel.findById(bookingId)
            .populate('apartmentId', 'title address pricePerNight')
            .populate('userId', 'firstName lastName email');
    },

    getAllBookings: async ({ page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' }) => {
        const skip = (Number(page) - 1) * Number(limit);
        const sort = { [sortBy]: order === 'desc' ? -1 : 1 };

        const bookings = await bookingModel.find()
            .populate('apartmentId', 'title address pricePerNight')
            .populate('userId', 'firstName lastName email')
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        const total = await bookingModel.countDocuments();

        return {
            bookings,
            pagination: {
                current: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        };
    }
};

export default bookingService;
