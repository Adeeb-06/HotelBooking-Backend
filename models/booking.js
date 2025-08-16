import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel"},
  roomIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  }],
  guestName:{type: String, required: true},
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
  },
  totalPrice: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const bookingModel = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default bookingModel;

