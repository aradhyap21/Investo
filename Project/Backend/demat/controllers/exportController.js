const db = require("../config/db");
const { Parser } = require("json2csv");

exports.exportTransactions = (req, res) => {
    db.query("SELECT * FROM transactions", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const fields = ["id", "stockSymbol", "type", "quantity", "price", "total", "date"];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(results);

        res.header("Content-Type", "text/csv");
        res.attachment("transactions.csv");
        res.send(csv);
    });
};
