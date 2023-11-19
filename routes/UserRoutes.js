import express from 'express'
import { createUser, loginUser, verifyEmail } from '../controllers/User.js'

const router = express.Router()

//CREATE USER
router.post('/register', createUser)

//VERIFY TOKEN
router.get('/verify/:token', verifyEmail)

//LOGIN USER
router.post('/', loginUser)

export default router