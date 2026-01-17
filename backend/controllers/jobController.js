const User = require('../models/User');

exports.matchJobs = async (req, res) => {
    try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
} catch (error) {
    // Check if the error is a MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
        return res.status(400).json({ message: "This email is already registered!" });
    }
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
}
};