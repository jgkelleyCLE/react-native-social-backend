import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import userRoutes from './routes/UserRoutes.js'

const app = express()

app.use(express.json({ limit: "10mb" }))
app.use(cors())

dotenv.config()

const port = process.env.PORT || 3001

//MONGOOSE
mongoose.connect(process.env.MONGO_URL)

let connectionObj = mongoose.connection;

connectionObj.on('connected', ()=> {
    console.log('database connected')
})

connectionObj.on("error", ()=> {
    console.log('database ERROR')
})

//ROUTING
app.use('/api/users', userRoutes)

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})