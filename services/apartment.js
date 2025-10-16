import apartmentModel from '../models/apartment.js';

const apartmentService = {
    createApartment: async (apartmentData) => {
        const apartment = new apartmentModel(apartmentData);
        return await apartment.save();
    },

    getApartmentById: async (id) => {
        return await apartmentModel.findById(id)
            .populate('createdBy', 'firstName lastName email -_id');
    },

    getAllApartments: async (filters, pagination) => {
        const { page, limit } = pagination;
        const skip = (Number(page) - 1) * Number(limit);

        const apartments = await apartmentModel.find(filters)
            .populate('createdBy', 'firstName lastName email -_id')
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await apartmentModel.countDocuments(filters);

        return {
            apartments,
            pagination: {
                current: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        };
    },

    updateApartment: async (id, userId, updateData) => {
        return await apartmentModel.findOneAndUpdate(
            { _id: id, createdBy: userId },
            updateData,
            { new: true, runValidators: true }
        ).populate('createdBy', 'firstName lastName email -_id');
    },

    deleteApartment: async (id, userId) => {
        return await apartmentModel.findOneAndDelete({
            _id: id,
            createdBy: userId
        });
    },

    checkAvailability: async (id, checkIn, checkOut) => {
        const apartment = await apartmentModel.findById(id);
        if (!apartment) return null;

        const isAvailable = apartment.availability.some(period => {
            const availableStart = new Date(period.startDate);
            const availableEnd = new Date(period.endDate);
            return checkIn >= availableStart && checkOut <= availableEnd;
        });

        return {
            available: isAvailable,
            apartment
        };
    }
};

export default apartmentService;
