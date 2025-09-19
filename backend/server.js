import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Tourist from './models/Tourist.js';
import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGODB_URI || !JWT_SECRET) {
  console.error("FATAL ERROR: MONGODB_URI or JWT_SECRET is not defined in the environment variables.");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  const { fullName, mobileNumber, email, password } = req.body;

  if (!fullName || !email || !password || !mobileNumber) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    let user = await Tourist.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new Tourist({
      fullName,
      mobileNumber,
      email,
      password: hashedPassword,
    });

    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  try {
    const user = await Tourist.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ token, ...userResponse });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
    // authMiddleware already verified the token and attached the user to req.user.
    // If it failed, it would have already sent an error response.
    res.json(req.user);
});


app.post('/api/auth/resetpassword', async (req, res) => {
    const { email, newPassword } = req.body;
    
    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required.' });
    }
    if (newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    try {
        const user = await Tourist.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password reset successful' });

    } catch (error) {
        console.error('Password Reset Error:', error.message);
        res.status(500).json({ message: 'Server error during password reset' });
    }
});


// --- USER ROUTES ---
app.get('/api/users/tourists', async (req, res) => {
  try {
    const tourists = await Tourist.find().select('-password');
    res.json(tourists);
  } catch (error) {
    console.error('Fetch Tourists Error:', error.message);
    res.status(500).json({ message: 'Server error fetching tourists' });
  }
});

app.put('/api/users/location', authMiddleware, async (req, res) => {
    const { lat, lng } = req.body;

    if (lat === undefined || lng === undefined) {
        return res.status(400).json({ message: 'Latitude and longitude are required.' });
    }
    
    try {
        const updatedTourist = await Tourist.findByIdAndUpdate(
            req.user.id,
            { location: { lat, lng, timestamp: Date.now() } },
            { new: true }
        ).select('-password');
        
        if (!updatedTourist) {
            return res.status(404).json({ message: 'Tourist not found' });
        }

        res.json(updatedTourist);
    } catch (error) {
        console.error('Update Location Error:', error.message);
        res.status(500).json({ message: 'Server error updating location' });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
