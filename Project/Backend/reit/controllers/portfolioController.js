const db = require("../config/db");

exports.getPortfolio = (req, res) => {
    db.query("SELECT * FROM portfolio", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addProperty = (req, res) => {
    const { propertyName, marketCap, dividendYield, performance } = req.body;
    const sql = "INSERT INTO portfolio (propertyName, marketCap, dividendYield, performance) VALUES (?, ?, ?, ?)";
    db.query(sql, [propertyName, marketCap, dividendYield, performance], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Property added successfully" });
    });
};

exports.deleteProperty = (req, res) => {
    const sql = "DELETE FROM portfolio WHERE id = ?";
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Property removed successfully" });
    });
};

exports.updateProperty = (req, res) => {
    const { marketCap, dividendYield, performance } = req.body;
    const sql = "UPDATE portfolio SET marketCap = ?, dividendYield = ?, performance = ? WHERE id = ?";
    db.query(sql, [marketCap, dividendYield, performance, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Property updated successfully" });
    });
};
