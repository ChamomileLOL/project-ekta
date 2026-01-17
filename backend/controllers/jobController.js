const User = require('../models/User');

exports.matchJobs = async (req, res) => {
    try {
        // GET USER'S SKILLS
        const user = await User.findById(req.user.id);
        
        // MOCK JOB DATABASE (In reality, this would be another Collection)
        const allJobs = [
            { title: "React Dev", requiredSkills: ["React", "Node"] },
            { title: "Driver", requiredSkills: ["Driving"] },
            { title: "Teacher", requiredSkills: ["B.Ed", "Teaching"] }
        ];

        // ALGORITHM: MATCH IF SKILLS OVERLAP (Blind to Religion/Caste)
        const matches = allJobs.filter(job => 
            job.requiredSkills.some(skill => user.skills.includes(skill))
        );

        res.json({
            status: "SUCCESS",
            candidate: user.name,
            matches: matches,
            message: "OPPORTUNITIES BASED ON MERIT."
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};