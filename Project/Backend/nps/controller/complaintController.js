const db = require("../config/db");

exports.submitComplaint = async (req, res) => {
    const { complaint_type, subject, details, priority } = req.body;
    try {
        const query = `INSERT INTO Complaints (complaint_type, subject, details, priority) VALUES (?, ?, ?, ?)`;
        await db.query(query, [complaint_type, subject, details, priority]);
        res.status(201).json({ message: "Complaint submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
