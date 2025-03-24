const db = require("../config/db");

exports.calculateRD = async (req, res) => {
    const { monthly_deposit, tenure, interest_rate } = req.body;

    if (!monthly_deposit || !tenure || !interest_rate) {
        return res.status(400).json({ error: "All fields are required" });
    }

    let months = tenure * 12;
    const monthlyRate = interest_rate / 100 / 12;
    let maturity_amount = 0;

    for (let i = 1; i <= months; i++) {
        maturity_amount += monthly_deposit * (1 + monthlyRate) ** (months - i + 1);
    }

    const interest_earned = maturity_amount - monthly_deposit * months;

    await db.query(
        `INSERT INTO RD_Calculations (monthly_deposit, tenure, interest_rate, maturity_amount, interest_earned) VALUES (?, ?, ?, ?, ?)`,
        [monthly_deposit, tenure, interest_rate, maturity_amount, interest_earned]
    );

    res.json({ monthly_deposit, interest_earned, maturity_amount });
};
