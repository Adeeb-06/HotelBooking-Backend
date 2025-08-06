import roomModel from "../models/room.js";

export const createRoom = async (req, res) => {
    const { name, bedCount } = req.body;

    if (!name || !bedCount) {
        return res.status(404).json({ message: "All fields are required" });
    }

    try {
        const roomCreated = new roomModel({
            name,
            bedCount
        });

        await roomCreated.save();

        res.status(201).json({ success: true, message: "Room created successfully" });
    } catch (error) {
        console.error("Room error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}