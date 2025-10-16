import mongoose from 'mongoose';

const apartmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  address: {
    street: String, 
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  pricePerNight: {
    type: Number,
    required: true
  },
  maxGuests: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number
  },
  bathrooms: {
    type: Number
  },
  amenities: [String],
  images: [String], // URLs of images
  availability: [{
    startDate: Date,
    endDate: Date
  
  }],
  createdBy: {
  type: mongoose.Schema.Types.ObjectId, ref: 'user'
},

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  } 
 


  
});

const apartmentModel= mongoose.model('apartment', apartmentSchema);

export default apartmentModel;
