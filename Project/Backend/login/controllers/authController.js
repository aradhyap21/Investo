exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByEmail(email);
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Include `name` in the JWT token and response
        const token = jwt.sign(
            { userId: user.id, name: user.name },  
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, name: user.name });  // Send name in response
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err });
    }
};
