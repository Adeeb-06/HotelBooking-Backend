import hotelModel from "../models/hotel.js";
import roomModel from "../models/room.js";
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

export const createRoom = async (req, res) => {
    const hotelId = req.hotelId;
    const { name, description, pricePerNight, bedType, extraBedPrice } = req.body;
     const amenities = JSON.parse(req.body.amenities || '[]');

    if (!name) {
        return res.status(404).json({ message: "All fields are required" });
    }

    const uploadImages = req.files.map(async (file) => {
        const res = await cloudinary.uploader.upload(file.path)
        fs.unlinkSync(file.path);
        return res.secure_url;
    });


    const imageUrls = await Promise.all(uploadImages);


    try {
        const roomCreated = new roomModel({
            name,
            description,
            // hotel: hotelId,
            pricePerNight,
            images: imageUrls,
            bedType,
            amenities,
            extraBedPrice
        });

        await roomCreated.save();
        await hotelModel.findByIdAndUpdate(hotelId, { $push: { rooms: roomCreated._id } });

        res.status(201).json({ success: true, message: "Room created successfully" });
    } catch (error) {
        console.error("Room error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}