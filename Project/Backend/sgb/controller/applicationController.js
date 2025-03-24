const db = require("../config/db");

exports.submitApplication = (req, res) => {
  const { name, pan, email, mobile, address, investmentAmount, goldQuantity, paymentMode, nominee, termsAccepted } = req.body;

  if (!termsAccepted) {
    return res.status(400).json({ error: "You must accept the Terms & Conditions" });
  }

  const sql = `INSERT INTO applications (name, pan, email, mobile, address, investmentAmount, goldQuantity, paymentMode, nominee, termsAccepted) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [name, pan, email, mobile, address, investmentAmount, goldQuantity, paymentMode, nominee, termsAccepted];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error inserting application:", err);
      return res.status(500).json({ error: "Application submission failed" });
    }
    res.status(201).json({ message: "Application submitted successfully!" });
  });
};

exports.getApplications = (req, res) => {
  db.query("SELECT * FROM applications", (err, results) => {
    if (err) {
      console.error("❌ Error fetching applications:", err);
      return res.status(500).json({ error: "Error fetching applications" });
    }
    res.json({ applications: results });
  });
};
