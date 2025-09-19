import express from 'express';
import Tourist from '../models/Tourist.js';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
    const { fullName, mobileNumber, email, password } = req.body;

    try {
        const userExists = await Tourist.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const user = await Tourist.create({
            fullName,
            mobileNumber,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                message: "User registered successfully"
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Tourist.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const userObject = user.toObject();
            delete userObject.password;

            res.json({
                ...userObject,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/auth/me
router.get('/me', protect, async (req, res) => {
    res.json(req.user);
});


// @route   POST /api/auth/resetpassword
router.post('/resetpassword', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await Tourist.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = newPassword; // Mongoose pre-save hook will hash it
        await user.save();
        res.json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


export default router;