const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper function to generate a JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user (Athlete or Recruiter)
// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        // We extract the base fields, and bundle the rest into `otherData`
        // This easily handles the difference between Athlete and Recruiter fields!
        const { name, email, password, role, location, phoneNumber, ...otherData } = req.body;

        // 1. Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Hash the password manually here in the controller
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create the user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Save the hashed version!
            role,
            location,
            phoneNumber,
            ...otherData 
        });

        // 4. Return success response with cookie
        if (user) {
            // Generate token ONCE
            const token = generateToken(user._id);

            // Set the token in an HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true, // Prevents client-side JS from reading the cookie
                secure: process.env.NODE_ENV === 'production', // Only sends over HTTPS in production mode
                sameSite: 'strict', // Prevents CSRF attacks
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            });

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token // Passing it in the JSON too, so Person 2 can inspect it if needed
            });
        } else {
            res.status(400).json({ message: 'Invalid user data received' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// @desc    Authenticate a user & get token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find the user by email
        const user = await User.findOne({ email });

        // 2. Check if user exists AND if the password matches using bcrypt
        if (user && (await bcrypt.compare(password, user.password))) {
            
            // Generate token ONCE
            const token = generateToken(user._id);

            // Set the token in an HTTP-only cookie
            res.cookie('token', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'strict', 
                maxAge: 30 * 24 * 60 * 60 * 1000 
            });

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token 
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during login' });
    }
};