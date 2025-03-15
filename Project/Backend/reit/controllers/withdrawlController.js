const db = require("../config/db");

exports.getWithdrawals = (req, res) => {
    db.query("SELECT * FROM withdrawals", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.requestWithdrawal = (req, res) => {
    const { id, date, type, amount } = req.body;
    const sql = "INSERT INTO withdrawals (id, date, type, amount, status) VALUES (?, ?, ?, ?, 'pending')";
    db.query(sql, [id, date, type, amount], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Withdrawal request submitted successfully" });
    });
};

exports.updateWithdrawal = (req, res) => {
    const { status } = req.body;
    const sql = "UPDATE withdrawals SET status = ? WHERE id = ?";
    db.query(sql, [status, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Withdrawal status updated successfully" });
    });
};
