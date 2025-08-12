import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  hotelName: {
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
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  }]
}, { timestamps: true });

const hotelModel = mongoose.models.hotel || mongoose.model("Hotel", hotelSchema);
export default hotelModel;
