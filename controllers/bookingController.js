import roomModel from "../models/room.js";
import bookingModel from "../models/booking.js";

export const createBooking = async (req, res) => {
    const  hotelId  = req.hotelId;
    const { roomIds, guestName, startDate, endDate, guests, totalPrice } = req.body;

    if (!roomIds || !Array.isArray(roomIds) || roomIds.length === 0 || !guestName || !startDate || !endDate || !guests) {
        return res.status(400).json({ message: "All fields are required and roomIds must be a non-empty array" });
    }

    console.log(hotelId)

    try {
        // 1️⃣ Check if all rooms exist
        const rooms = await roomModel.find({ _id: { $in: roomIds } });
        if (rooms.length !== roomIds.length) {
            return res.status(404).json({ message: "One or more rooms not found" });
        }

        // Convert to Date objects
        const newStart = new Date(startDate);
        const newEnd = new Date(endDate);

        // 2️⃣ Check for overlapping bookings for each room
        for (const roomId of roomIds) {
            const existingBookings = await bookingModel.find({ roomIds: roomId });

            for (const booking of existingBookings) {
                const existingStart = new Date(booking.startDate);
                const existingEnd = new Date(booking.endDate);
                const room = await roomModel.findById(roomId);

                // 🔑 Raw if/else overlap check
                if (existingStart <= newEnd && existingEnd >= newStart) {
                    return res.status(409).json({
                        success: false,
                        message: `❌ Room ${room.name} is already booked between ${existingStart.toDateString()} and ${existingEnd.toDateString()}`
                    });
                }
            }
        }

        // 3️⃣ Create booking if no conflicts
        const newBooking = new bookingModel({
            hotelId,
            roomIds,
            guestName,
            startDate: newStart,
            endDate: newEnd,
            guests,
            totalPrice
        });

        await newBooking.save();

        // Link booking to rooms
        for (const room of rooms) {
            room.bookings.push(newBooking._id);
            await room.save();
        }

        res.status(201).json({ success: true, message: "✅ Booking created successfully for all rooms" });

    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export const getBookings = async (req, res) => {
    const  hotelId  = req.hotelId; 
    try {
        const bookings = await bookingModel.find({ hotelId });
        res.status(200).json({ success: true, bookings });
        
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getBookingById = async (req, res) => {
    const { hotelId } = req.hotelId;
    const { bookingId } = req.params;
    try {
        const booking = await bookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        res.status(200).json({ success: true, booking });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};