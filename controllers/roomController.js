import hotelModel from "../models/hotel.js";
import roomModel from "../models/room.js";

export const createRoom = async (req, res) => {
    const { name, bedCount , hotelId } = req.body;

    if (!name || !bedCount || !hotelId) {
        return res.status(404).json({ message: "All fields are required" });
    }

    try {
        const roomCreated = new roomModel({
            name,
            bedCount,
            hotel: hotelId
        });

        await roomCreated.save();
        await hotelModel.findByIdAndUpdate(hotelId, { $push: { rooms: roomCreated._id } });

        res.status(201).json({ success: true, message: "Room created successfully" });
    } catch (error) {
        console.error("Room error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}