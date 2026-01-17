const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // DEMOGRAPHIC DATA (Protected by Article 15 - Used for Analytics, not Discrimination)
    region: { type: String, default: 'Pan-India' }, 
    skills: [{ type: String }],
    role: { type: String, enum: ['seeker', 'employer'], default: 'seeker' }
}, { timestamps: true });

// INDEXING FOR PERFORMANCE (Not Segregation)
userSchema.index({ skills: 1 }); 
userSchema.index({ region: 1 });

module.exports = mongoose.model('User', userSchema);