const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findByEmail(email);
        if (userExists) return res.status(400).json({ msg: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.createUser(name, email, hashedPassword);

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { userId: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, name: user.name });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err });
    }
};
