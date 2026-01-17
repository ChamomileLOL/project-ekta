const User = require('../models/User');

exports.matchJobs = async (req, res) => {
    try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
} catch (error) {
    if (error.code === 11000) {
        return res.status(400).json({ message: "Email already exists!" });
    }
    // Only log real, scary errors (like database connection loss)
    console.error("UNEXPECTED ERROR:", error); 
    res.status(500).json({ message: "Internal Server Error" });
}
};