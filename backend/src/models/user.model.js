const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    // Common Fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['athlete', 'recruiter'], required: true },
    location: { type: String, required: true }, // City/Village
    phoneNumber: { type: String, required: true }, // Crucial for rural access

    // Athlete-Specific Fields
    sport: { type: String },
    position: { type: String }, // e.g., "Batsman"
    bio: { type: String },
    height: { type: String },
    weight: { type: String },
    trustScore: { type: Number, default: 0 },

    // Recruiter-Specific Fields
    organization: { type: String }, // e.g., "Local Cricket Academy"
    savedPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt
});


module.exports = mongoose.model('User', userSchema);