import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // optional, if you implement users
//   },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

const bookingModel = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default bookingModel;

