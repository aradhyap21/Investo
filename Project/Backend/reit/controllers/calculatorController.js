exports.calculateReturns = (req, res) => {
    const { investment, years, returnRate } = req.body;
    const futureValue = investment * Math.pow(1 + returnRate / 100, years);
    res.json({ futureValue });
};
