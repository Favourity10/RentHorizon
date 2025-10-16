import express from 'express';
import { authMiddleware } from '../middleware/authmiddleware.js';
import { adminMiddleware } from '../middleware/adminmiddleware.js';
import apartmentController from '../controller/apartment.js';

const apartmentRoute = express.Router();

// Public Routes
apartmentRoute.get('/', apartmentController.getAllApartments);
apartmentRoute.get('/:id', apartmentController.getApartmentById);
apartmentRoute.get('/:id/availability', apartmentController.checkAvailability);

// Admin-only Routes
apartmentRoute.post('/', authMiddleware, adminMiddleware, apartmentController.createApartment);
apartmentRoute.put('/:id', authMiddleware, adminMiddleware, apartmentController.updateApartment);
apartmentRoute.delete('/:id', authMiddleware, adminMiddleware, apartmentController.deleteApartment);


export default apartmentRoute;