const db = require("../config/db");

exports.getTransactions = (req, res) => {
    db.query("SELECT * FROM transactions ORDER BY date DESC", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addTransaction = (req, res) => {
    const { stockSymbol, type, quantity, price } = req.body;
    const total = quantity * price;
    const sql = "INSERT INTO transactions (stockSymbol, type, quantity, price, total) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [stockSymbol, type, quantity, price, total], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Transaction added successfully" });
    });
};
