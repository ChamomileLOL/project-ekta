const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect, civilDiscourse } = require('../middleware/authMiddleware');
const { matchJobs } = require('../controllers/jobController');

// REGISTRATION / UPDATE ROUTE
router.post('/register', civilDiscourse, async (req, res) => {
    try {
        const { name, email, password, skills } = req.body;

        // Use findOneAndUpdate with 'upsert: true'
        // This means: If user exists, update skills. If not, create new user.
        const user = await User.findOneAndUpdate(
            { email: email.toLowerCase() }, // Find by email
            { 
                name, 
                password, // Note: In a real app, hash this before saving
                $addToSet: { skills: { $each: skills } } // Adds new skills without duplicates
            },
            { new: true, upsert: true, runValidators: true }
        );

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        // Return a custom status so the user knows if they were updated
        res.status(200).json({ 
            message: "Profile synchronized successfully", 
            token, 
            user 
        });

    } catch (error) {
        console.error("Sync Error:", error.message);
        res.status(500).json({ 
            message: "Server Error during synchronization", 
            detail: error.message 
        });
    }
});

router.get('/opportunities', protect, matchJobs);

module.exports = router;