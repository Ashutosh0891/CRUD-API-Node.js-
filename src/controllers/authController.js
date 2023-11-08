const User = require('../models/userSchema')

const bycrypt = require('bcrypt');

const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret';
exports.postSignup = async (req, res, next) => {
    try {
        const name = req.body.name
        const email = req.body.email;
        const password = req.body.password;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array()[0].msg })
        }


        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'email exists already' })
        }
        let hashPass = await bycrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashPass
        })
        await newUser.save();
        res.json({ success: true, message: "user created successfully", user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array()[0].msg })
        }

        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        let passMatch = await bycrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user._id
            }
        }
        const token = jwt.sign(payload, JWT_SECRET);
        console.log(token)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.user.id;

        let user = await User.findById(userId);
        res.json({ success: true, user });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}