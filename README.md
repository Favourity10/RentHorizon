# Rent Horizon 🏢

> A modern REST API for managing apartment rentals, bookings, and user interactions.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-v18.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5.x-green.svg)](https://www.mongodb.com/)

## Table of Contents
- Features
- Tech Stack
- API Documentation
- Getting Started
- Environment Variables
- API Routes
- Contributing
- License
- Contact

## Features

### 👤 User Management
- Registration and Authentication
- JWT-based authorization
- User profile management
- Role-based access control (Admin/User)

### 🏢 Apartment Management
- CRUD operations for apartments
- Advanced search and filtering
- Availability checking
- Image management

### 📅 Booking System
- Create and manage bookings
- Booking status tracking
- View booking history
- Automated availability updates

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Documentation**: OpenAPI
- **Testing**: Jest (unit testing)

## Getting Started

1. **Clone the repository**
```bash
git clone https://github.com/Favourity10/RentHorizon.git
cd RentHorizon
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development server**
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
```

## API Routes

### Authentication Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/refresh` | Refresh token | Private |
| POST | `/api/auth/logout` | Logout user | Private |

### User Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/users/profile` | Get user profile | Private |
| PUT | `/api/users/profile` | Update profile | Private |
| GET | `/api/users/bookings` | Get user bookings | Private |

### Apartment Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/apartments` | List apartments | Public |
| GET | `/api/apartments/:id` | Get apartment | Public |
| POST | `/api/apartments` | Create apartment | Admin |
| PUT | `/api/apartments/:id` | Update apartment | Admin |
| DELETE | `/api/apartments/:id` | Delete apartment | Admin |

### Booking Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/api/bookings` | Create booking | Private |
| GET | `/api/bookings/:id` | Get booking | Private |
| PUT | `/api/bookings/:id/cancel` | Cancel booking | Private |
| GET | `/api/bookings` | List bookings | Admin |

## Contributing

1. Fork the project
2. Create your feature branch
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/Favourity10/RentHorizon](https://github.com/Favourity10/RentHorizon)

---
<div align="center">
  <sub>Built with ❤️ by RentHorizon Team</sub>
</div>
