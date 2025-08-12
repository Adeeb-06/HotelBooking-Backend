import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
 name: { type: String, required: true },
  description: String,
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel"},
  pricePerNight: { type: Number, required: true },
  bedType: String,
  images: [String],
  amenities: [String],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  extraBedPrice: Number,
}, { timestamps: true });

const roomModel = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default roomModel;
