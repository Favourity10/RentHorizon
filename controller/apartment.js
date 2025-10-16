import apartmentService from '../services/apartment.js';

const apartmentController = {
    createApartment: async (req, res) => {
        try {
            const {
                title, description, address, pricePerNight,
                maxGuests, bedrooms, bathrooms, amenities,
                images, availability
            } = req.body;

            if (!title || !pricePerNight || !maxGuests || !address) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields'
                });
            }

            const newApartment = await apartmentService.createApartment({
                title,
                description,
                address,
                pricePerNight,
                maxGuests,
                bedrooms,
                bathrooms,
                amenities,
                images,
                availability,
                createdBy: req.user._id
            });

            res.status(201).json({
                success: true,
                message: 'Apartment created successfully',
                data: newApartment
            });

        } catch (error) {
            console.error('Create apartment error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    getApartmentById: async (req, res) => {
        try {
            const apartment = await apartmentService.getApartmentById(req.params.id);
            if (!apartment) {
                return res.status(404).json({ success: false, message: 'Apartment not found' });
            }

            res.status(200).json({ success: true, data: apartment });

        } catch (error) {
            console.error('Get apartment error:', error);
            if (error.name === 'CastError') {
                return res.status(400).json({ success: false, message: 'Invalid apartment ID format' });
            }
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    getAllApartments: async (req, res) => {
        try {
            const {
                minPrice, maxPrice, city, maxGuests,
                bedrooms, amenities, page = 1, limit = 10
            } = req.query;

            const filter = {};
            if (city) filter['address.city'] = new RegExp(city, 'i');
            if (maxGuests) filter.maxGuests = { $gte: Number(maxGuests) };
            if (bedrooms) filter.bedrooms = Number(bedrooms);

            const data = await apartmentService.getAllApartments(filter, { page, limit });

            res.status(200).json({ success: true, data });

        } catch (error) {
            console.error('Get all apartments error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    updateApartment: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = { ...req.body, updatedAt: new Date() };

            Object.keys(updateData).forEach(key =>
                updateData[key] === undefined && delete updateData[key]
            );

            if (Object.keys(updateData).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No valid update data provided'
                });
            }

            const updatedApartment = await apartmentService.updateApartment(id, req.user._id, updateData);

            if (!updatedApartment) {
                return res.status(404).json({
                    success: false,
                    message: 'Apartment not found or not authorized to update'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Apartment updated successfully',
                data: updatedApartment
            });

        } catch (error) {
            console.error('Update apartment error:', error);
            if (error.name === 'CastError') {
                return res.status(400).json({ success: false, message: 'Invalid apartment ID format' });
            }
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    deleteApartment: async (req, res) => {
        try {
            const deletedApartment = await apartmentService.deleteApartment(req.params.id, req.user._id);
            if (!deletedApartment) {
                return res.status(404).json({
                    success: false,
                    message: 'Apartment not found or not authorized to delete'
                });
            }

            res.status(200).json({ success: true, message: 'Apartment deleted successfully' });

        } catch (error) {
            console.error('Delete apartment error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    checkAvailability: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            if (!startDate || !endDate) {
                return res.status(400).json({
                    success: false,
                    message: 'Both start date and end date are required'
                });
            }

            const checkIn = new Date(startDate);
            const checkOut = new Date(endDate);
            if (isNaN(checkIn) || isNaN(checkOut) || checkIn >= checkOut) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid or inconsistent date range'
                });
            }

            const result = await apartmentService.checkAvailability(req.params.id, checkIn, checkOut);
            if (!result) {
                return res.status(404).json({ success: false, message: 'Apartment not found' });
            }

            res.status(200).json({
                success: true,
                data: {
                    available: result.available,
                    requestedDates: { checkIn, checkOut },
                    apartment: {
                        id: result.apartment._id,
                        title: result.apartment.title,
                        availability: result.apartment.availability
                    }
                }
            });

        } catch (error) {
            console.error('Check availability error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
};

export default apartmentController;
