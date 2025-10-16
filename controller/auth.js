import authService from '../services/auth.js';
import emailVal from '../utilities/emailValidation.js';
import passwordVal from '../utilities/passwordValidation.js';

const authController = {
    register: async (req, res) => {
        try {
            const { email, password, firstName, lastName } = req.body;

            // Validate input
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            if (!emailVal.validate(email)) {
                return res.status(400).json({ success: false, message: 'Invalid email format' });
            }

            if (!passwordVal.validatePassword(password)) {
                return res.status(400).json({
                    success: false,
                    message:
                        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                });
            }

            // Call service
            const { user, token } = await authService.registerUser({
                email,
                password,
                firstName,
                lastName,
                role: 'user'
            });

            res.status(201).json({
                success: true,
                message: 'Registration successful',
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    },
                    token
                }
            });
        } catch (error) {
            console.error('Register error:', error);
            const status = error.message.includes('exists') ? 400 : 500;
            res.status(status).json({ success: false, message: error.message });
        }
    },

    registerAdmin: async (req, res) => {
        try {
            const { email, password, firstName, lastName } = req.body;

            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({ success: false, message: 'All fields are required' });
            }

            if (!emailVal.validate(email)) {
                return res.status(400).json({ success: false, message: 'Invalid email format' });
            }

            if (!passwordVal.validatePassword(password)) {
                return res.status(400).json({
                    success: false,
                    message:
                        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                });
            }

            const { user, token } = await authService.registerUser({
                email,
                password,
                firstName,
                lastName,
                role: 'admin'
            });

            res.status(201).json({
                success: true,
                message: 'Admin registration successful',
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    },
                    token
                }
            });
        } catch (error) {
            console.error('Admin registration error:', error);
            const status = error.message.includes('exists') ? 400 : 500;
            res.status(status).json({ success: false, message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ success: false, message: 'Email and password are required' });
            }

            const { user, token } = await authService.loginUser(email, password);

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    },
                    token
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            const status = error.message.includes('Invalid credentials') ? 401 : 500;
            res.status(status).json({ success: false, message: error.message });
        }
    },

    refreshToken: async (req, res) => {
        try {
            const { user } = req; // from auth middleware
            const { user: foundUser, token } = await authService.refreshToken(user._id);

            res.status(200).json({
                success: true,
                message: 'Token refreshed successfully',
                data: {
                    user: {
                        id: foundUser._id,
                        email: foundUser.email,
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                        role: foundUser.role
                    },
                    token
                }
            });
        } catch (error) {
            console.error('Refresh token error:', error);
            const status = error.message.includes('not found') ? 404 : 500;
            res.status(status).json({ success: false, message: error.message });
        }
    },

    logout: async (req, res) => {
        try {
            // JWT logout is client-side: remove token from client storage
            res.status(200).json({
                success: true,
                message: 'Logged out successfully'
            });
        } catch (error) {
            console.error('Logout error:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
};

export default authController;
