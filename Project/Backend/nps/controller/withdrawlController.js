const db = require("../config/db");

exports.getWithdrawalHistory = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Withdrawals");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
