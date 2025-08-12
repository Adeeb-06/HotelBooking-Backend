import roomModel from "../models/room.js";
import bookingModel from "../models/booking.js";

export const createBooking = async (req, res) => {
    const { roomId, guestName, startDate, endDate, guests } = req.body;

    if (!roomId || !guestName || !startDate || !endDate || !guests) {
        return res.status(404).json({ message: "All fields are required" });
    }

    try {
        const room = await roomModel.findById(roomId);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const overlappingBooking = await bookingModel.findOne({
            room: roomId,
            startDate: { $lt: endDate },
            endDate: { $gt: startDate }
        });

        if (overlappingBooking) {
            return res.status(409).json({
                success: false,
                message: "Room already booked during selected dates"

            });
        }

        const newBooking = new bookingModel({
            room: room._id,
            guestName,
            startDate,
            endDate,
            guests
        });
        room.bookings.push(newBooking._id);
        await room.save();
        await newBooking.save();

        res.status(201).json({ success: true, message: "Booking created successfully" });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}