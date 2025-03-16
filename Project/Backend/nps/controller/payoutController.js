const db = require("../config/db");

exports.requestPayout = async (req, res) => {
    const { amount, payout_type, payout_frequency, payment_method, reason } = req.body;
    try {
        const query = `INSERT INTO Payouts (amount, payout_type, payout_frequency, payment_method, reason) VALUES (?, ?, ?, ?, ?)`;
        await db.query(query, [amount, payout_type, payout_frequency, payment_method, reason]);
        res.status(201).json({ message: "Payout request submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
