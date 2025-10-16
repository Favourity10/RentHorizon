
import userService from '../services/user.js';

const userController = {
    
    getProfile: async (req, res) => {
        try {
            const userProfile = await userService.getUserProfile(req.user);
            res.status(200).json({
                success: true,
                data: { user: userProfile }
            });
        } catch (error) {
            console.error('Profile fetch error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Internal server error'
            });
        }
    },

    
    updateProfile: async (req, res) => {
        try {
            const { firstName, lastName } = req.body;

            if (!firstName && !lastName) {
                return res.status(400).json({
                    success: false,
                    message: 'At least one field (firstName or lastName) is required for update'
                });
            }

            const updatedUser = await userService.updateUserProfile(req.user._id, { firstName, lastName });

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: { user: updatedUser }
            });
        } catch (error) {
            console.error('Profile update error:', error);
            res.status(400).json({
                success: false,
                message: error.message || 'Internal server error'
            });
        }
    },

    getUserBookings: async (req, res) => {
        try {
            const result = await userService.getUserBookings(req.user._id, req.query);

            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error('Get user bookings error:', error);
            res.status(500).json({
                success: false,
                message: error.message || 'Internal server error'
            });
        }
    }


    
    
};

export default userController;
