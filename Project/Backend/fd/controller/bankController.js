const db = require("../config/db");

exports.getBankRates = async (req, res) => {
    const [rows] = await db.query("SELECT * FROM Bank_Rates");
    res.json(rows);
};

exports.updateBankRate = async (req, res) => {
    const { bank_name, fd_rate, rd_rate } = req.body;
    if (!bank_name || !fd_rate || !rd_rate) {
        return res.status(400).json({ error: "All fields are required" });
    }

    await db.query(
        `INSERT INTO Bank_Rates (bank_name, fd_rate, rd_rate) VALUES (?, ?, ?) 
         ON DUPLICATE KEY UPDATE fd_rate = VALUES(fd_rate), rd_rate = VALUES(rd_rate)`,
        [bank_name, fd_rate, rd_rate]
    );

    res.json({ message: "Bank rates updated successfully" });
};
