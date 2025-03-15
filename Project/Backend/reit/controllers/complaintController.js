const db = require("../config/db");

exports.getComplaints = (req, res) => {
    db.query("SELECT * FROM complaints", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.submitComplaint = (req, res) => {
    const { complaintType, subject } = req.body;
    const sql = "INSERT INTO complaints (complaintType, subject, status) VALUES (?, ?, 'open')";
    db.query(sql, [complaintType, subject], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Complaint submitted successfully" });
    });
};

exports.updateComplaint = (req, res) => {
    const { status } = req.body;
    const sql = "UPDATE complaints SET status = ? WHERE id = ?";
    db.query(sql, [status, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Complaint status updated successfully" });
    });
};
