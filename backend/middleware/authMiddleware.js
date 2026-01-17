const jwt = require('jsonwebtoken');

// 1. VERIFY USER IDENTITY
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "NOT AUTHORIZED" });
        }
    } else {
        res.status(401).json({ message: "NO TOKEN, NO ENTRY" });
    }
};

// 2. THE CONSTITUTIONAL FILTER (Block Hate Speech, Allow Dissent)
const civilDiscourse = (req, res, next) => {
    const { bio, comments } = req.body;
    // We block abusive terms, NOT political ones like 'Union' or 'Protest'
    const hateSpeech = ["violence", "kill", "terror"]; 
    
    if (bio && hateSpeech.some(word => bio.includes(word))) {
        return res.status(400).json({ error: "VIOLATION: HATE SPEECH DETECTED." });
    }
    next();
};

module.exports = { protect, civilDiscourse };