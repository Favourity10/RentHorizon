import express from 'express'
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.js';
import apartmentRoute from './routes/apartment.js';
import bookingRoutes from './routes/booking.js';
dotenv.config();

const app = express() 
const port = 3000

await mongoose.connect(process.env.MONGODB_URI);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended:false}))

// Routes
app.use('/auth', authRoute); 
app.use('/user', userRouter);
app.use('/apartment', apartmentRoute);
app.use('/booking', bookingRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
