const db = require("../config/db");

exports.calculateFD = async (req, res) => {
    const { principal, tenure, interest_rate } = req.body;

    if (!principal || !tenure || !interest_rate) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const interest = (principal * interest_rate * tenure) / 100;
    const maturity_amount = principal + interest;

    await db.query(
        `INSERT INTO FD_Calculations (principal, tenure, interest_rate, maturity_amount, interest_earned) VALUES (?, ?, ?, ?, ?)`,
        [principal, tenure, interest_rate, maturity_amount, interest]
    );

    res.json({ principal, interest, maturity_amount });
};
