const express = require('express');
const router = express.Router();
const { protect, civilDiscourse } = require('../middleware/authMiddleware');
const { matchJobs } = require('../controllers/jobController');
// Note: We need a register/login controller, simplified here for brevity
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// QUICK REGISTER ROUTE
router.post('/register', civilDiscourse, async (req, res) => {
    const { name, email, password, skills } = req.body;
    const user = await User.create({ name, email, password, skills });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
});

// THE MERIT ROUTE
router.get('/opportunities', protect, matchJobs);

module.exports = router;