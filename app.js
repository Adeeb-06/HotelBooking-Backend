import express from 'express'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import roomRouter from './routes/roomRouter.js'
import bookingRouter from './routes/bookingRouter.js'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

const app = express()


connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));



app.use('/api/room', roomRouter);
app.use('/api', bookingRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
