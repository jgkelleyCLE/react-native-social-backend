import User from '../models/UserModel.js'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

//REGISTER
export const createUser = async(req, res) => {

    try {
        
        const { name, email, password, profileImage } = req.body

        //check if user already exists
        const existingUser = await User.findOne({ email })

        if(existingUser){
            console.log("Email already registered")
            return res.status(400).json({ message: "Email already registered" })
        }

        //create new user
        const newUser = new User({
            name,
            email,
            password,
            profileImage
        })

        //generate verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex")

        //save user to database

        await newUser.save()

        //send verification email
        sendVerificationEmail(newUser.email, newUser.verificationToken)

        res.status(201).json({ message: "Registration successful" })


    } catch (error) {
        res.status(400).json({ message: "Registration failed" })
    }

}

//SEND VERIFICATION EMAIL
const sendVerificationEmail = async(email, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "john.gerard.kelley@gmail.com",
            pass: "alxsevhxhqgumewt"
        }
    })

    const mailOptions = {
        from: "jackiewebdev0@gmail.com",
        to: email,
        subject: 'Email Verification',
        text: `Please click the following link to verify your email: http://10.0.0.3:3001/api/users/verify/${verificationToken}`,

    }

    //send email

    try {
        
        await transporter.sendMail(mailOptions)
        console.log('verification email sent successfully')

    } catch (error) {
        res.status(400).json({message: "Error sending verification email"})
    }

}


//VERIFY EMAIL
export const verifyEmail = async(req, res) => {

    try {
        
        const token = req.params.token

        const user = await User.findOne({ verificationToken: token })

        if(!user){
            return res.status(404).json({ message: "Invalid verification token" })
        }

        //if user, mark as verified
        user.verified = true
        user.verificationToken = undefined;

        await user.save()

        res.status(200).json({ message: "Email verified successfully" })

    } catch (error) {
        res.status(400).json({ message: "Email verification failed" })
    }

}




//LOGIN USER

export const loginUser = async(req, res) => {

}