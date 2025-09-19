import express from 'express';
import Tourist from '../models/Tourist.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/users/tourists
// @desc    Get all tourists (for admin)
// @access  Public (for simplicity, could be admin-protected)
router.get('/tourists', async (req, res) => {
    try {
        const tourists = await Tourist.find({}).select('-password');
        res.json(tourists);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/users/location
// @desc    Update user location
// @access  Private
router.put('/location', protect, async (req, res) => {
    const { lat, lng } = req.body;
    
    try {
        const user = await Tourist.findById(req.user._id);

        if (user) {
            user.location = { lat, lng, timestamp: Date.now() };
            await user.save();
            res.json({ message: 'Location updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
