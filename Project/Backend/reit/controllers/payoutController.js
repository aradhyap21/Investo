const db = require("../config/db");

exports.getPayouts = (req, res) => {
    db.query("SELECT * FROM payout_requests", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.requestPayout = (req, res) => {
    const { amount, payoutType, frequency, method } = req.body;
    const sql = "INSERT INTO payout_requests (amount, payoutType, frequency, method) VALUES (?, ?, ?, ?)";
    db.query(sql, [amount, payoutType, frequency, method], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Payout request submitted" });
    });
};

exports.updatePayout = (req, res) => {
    const { status } = req.body;
    const sql = "UPDATE payout_requests SET status = ? WHERE id = ?";
    db.query(sql, [status, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Payout status updated" });
    });
};
