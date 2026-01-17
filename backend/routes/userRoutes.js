const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect, civilDiscourse } = require('../middleware/authMiddleware');
const { matchJobs } = require('../controllers/jobController');

// 1. REGISTRATION ROUTE WITH ERROR HANDLING
router.post('/register', civilDiscourse, async (req, res) => {
    try {
        const { name, email, password, skills } = req.body;
        
        // This line is where the duplicate error happens
        const user = await User.create({ name, email, password, skills });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ token, user });

    } catch (error) {
        // Handle MongoDB Duplicate Key Error (Code 11000)
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: "Duplicate Error", 
                detail: "This person/email is already in the database!" 
            });
        }
        
        // Handle other general errors
        console.error("Signup Error:", error.message);
        res.status(500).json({ 
            message: "Server Error", 
            detail: error.message 
        });
    }
});

// 2. THE MERIT ROUTE
router.get('/opportunities', protect, matchJobs);

module.exports = router;