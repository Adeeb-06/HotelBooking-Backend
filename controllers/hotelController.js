import hotelModel from "../models/hotel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // make sure you're importing jwt
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

export const createHotel = async (req, res) => {
    const { name, email, password, city, address, phone } = req.body;

    if (!name || !email || !password || !city || !address || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingHotel = await hotelModel.findOne({ name });

        if (existingHotel) {
            return res.status(409).json({ message: "Hotel already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        const uploadedImage = await cloudinary.uploader.upload(req.file.path)
        console.log('Deleting file:', req.file.path);
        fs.unlinkSync(req.file.path);





        const newHotel = new hotelModel({
            name,
            email,
            password: hash,
            city,
            address,
            phone,
            image: uploadedImage.secure_url,

        });

        await newHotel.save();

        const token = jwt.sign({ id: newHotel._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 86400000, // 1 day
        });

        res.status(201).json({ success: true, message: "Hotel created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


export const loginHotel = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({ message: "All fields are required" });
    }

    try {
        const hotel = await hotelModel.findOne({ email });
        if (!hotel) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, hotel.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: hotel._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 86400000,
        });
        res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}