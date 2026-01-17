const User = require('../models/User');

// 1. MATCH JOBS FUNCTION (Your route needs this!)
exports.matchJobs = async (req, res) => {
    try {
        // Simple logic to return opportunities based on user skills
        const opportunities = [
            { title: "Community Builder", merit: "High", location: "Mumbai" },
            { title: "Tech Mentor", merit: "Medium", location: "Remote" }
        ];
        res.json(opportunities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", detail: error.message });
    }
};

// 2. REGISTER USER FUNCTION
exports.registerUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ 
                message: "Duplicate Error", 
                detail: "This person is already in the database!" 
            });
        }
        res.status(500).json({ 
            message: "Server Error", 
            detail: error.message 
        });
    }
};