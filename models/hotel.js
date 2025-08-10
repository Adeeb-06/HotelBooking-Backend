import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true,
  },
  image:{type: String},
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  }]
}, { timestamps: true });

const hotelModel = mongoose.models.hotel || mongoose.model("Hotel", hotelSchema);
export default hotelModel;
