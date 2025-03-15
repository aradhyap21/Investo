const db = require("../config/db");

exports.submitForm = (req, res) => {
    const { fullName, email, mobile, panNumber, accountType, broker } = req.body;
    const sql = "INSERT INTO account_requests (fullName, email, mobile, panNumber, accountType, broker) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [fullName, email, mobile, panNumber, accountType, broker], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Form submitted successfully" });
    });
};
