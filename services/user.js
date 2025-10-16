// services/userService.js
import userModel from '../models/user.js';
import bookingModel from '../models/booking.js';

const userService = {
    // Get user profile
    getUserProfile: async (user) => {
        return {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    },

    // Update user profile
    updateUserProfile: async (userId, updateData) => {
        const { firstName, lastName } = updateData;
        const updateFields = {};

        if (firstName) {
            if (firstName.length < 2 || firstName.length > 255)
                throw new Error('First name must be between 2 and 255 characters');
            updateFields.firstName = firstName;
        }

        if (lastName) {
            if (lastName.length < 2 || lastName.length > 255)
                throw new Error('Last name must be between 2 and 255 characters');
            updateFields.lastName = lastName;
        }

        updateFields.updatedAt = new Date();

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true }
        ).select('-password');

        if (!updatedUser) throw new Error('User not found');

        return {
            id: updatedUser._id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
        };
    },

    getUserBookings: async (userId, queryParams) => {
        const { 
            status,
            page = 1,
            limit = 10,
            sortBy = 'createdAt',
            order = 'desc'
        } = queryParams;

        // Build filter object
        const filter = { userId };
        if (status) {
            filter.status = status;
        }

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);

        // Build sort object
        const sort = {};
        sort[sortBy] = order === 'desc' ? -1 : 1;

        // Get bookings with pagination
        const bookings = await bookingModel.find(filter)
            .populate('apartmentId', 'title address pricePerNight images')
            .sort(sort)
            .skip(skip)
            .limit(Number(limit));

        // Get total count for pagination
        const total = await bookingModel.countDocuments(filter);

        return {
            bookings: bookings.map(booking => ({
                id: booking._id,
                apartment: {
                    id: booking.apartmentId._id,
                    title: booking.apartmentId.title,
                    address: booking.apartmentId.address,
                    pricePerNight: booking.apartmentId.pricePerNight,
                    images: booking.apartmentId.images
                },
                checkInDate: booking.checkInDate,
                checkOutDate: booking.checkOutDate,
                numberOfGuests: booking.numberOfGuests,
                totalPrice: booking.totalPrice,
                status: booking.status,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            })),
            pagination: {
                current: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        };
    }


    
};

export default userService;
