exports.calculateBrokerage = (req, res) => {
    const { tradeValue, brokerageRate } = req.body;
    const brokerage = tradeValue * (brokerageRate / 100);
    res.json({ brokerage });
};

exports.calculateReturns = (req, res) => {
    const { investment, years, returnRate } = req.body;
    const futureValue = investment * Math.pow(1 + returnRate / 100, years);
    res.json({ futureValue });
};
