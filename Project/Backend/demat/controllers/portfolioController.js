const db = require("../config/db");

exports.getPortfolio = (req, res) => {
    db.query("SELECT * FROM portfolio", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addStock = (req, res) => {
    const { stockName, stockSymbol, quantity, avgPrice, currentPrice } = req.body;
    const sql = "INSERT INTO portfolio (stockName, stockSymbol, quantity, avgPrice, currentPrice) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [stockName, stockSymbol, quantity, avgPrice, currentPrice], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Stock added successfully" });
    });
};

exports.deleteStock = (req, res) => {
    const sql = "DELETE FROM portfolio WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Stock removed successfully" });
    });
};

exports.updateStockPrice = (req, res) => {
    const { currentPrice } = req.body;
    const sql = "UPDATE portfolio SET currentPrice = ? WHERE id = ?";
    db.query(sql, [currentPrice, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Stock price updated successfully" });
    });
};
