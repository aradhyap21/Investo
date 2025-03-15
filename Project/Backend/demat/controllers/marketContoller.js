const axios = require("axios");

exports.getStockPrice = async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YOUR_API_KEY`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Stock data not available" });
    }
};
