const User = require('../models/User');

// Look for your POST or registration function
exports.registerUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        // ADD THIS PART:
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