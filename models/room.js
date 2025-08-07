import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bedCount: {
    type: Number,
    required: true
  },
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required:true
  },
  // This will hold references to all bookings for this room
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }]
}, { timestamps: true });

const roomModel = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default roomModel;
