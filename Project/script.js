document.addEventListener('DOMContentLoaded',() => {
    const apiKey = "IGP8IDITX2N9OHU0";  // Replace with your Alpha Vantage API key

async function fetchStockData() {
    const symbol = document.getElementById("stockSymbol").value;
    if (!symbol) {
        alert("Please enter a stock symbol!");
        return;
    }

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data["Error Message"]) {
            alert("Invalid Stock Symbol! Please try again.");
            return;
        }

        const timeSeries = data["Time Series (Daily)"];
        if (!timeSeries) {
            alert("No data found for this stock!");
            return;
        }

        const dates = Object.keys(timeSeries).slice(0, 30).reverse();
        const prices = dates.map(date => parseFloat(timeSeries[date]["4. close"]));

        updateChart(dates, prices, symbol);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        alert("Failed to fetch stock data.");
    }
}

let stockChart;

function updateChart(labels, data, symbol) {
    const ctx = document.getElementById("stockChart").getContext("2d");

    if (stockChart) {
        stockChart.destroy();
    }

    stockChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: `${symbol} Stock Price`,
                data: data,
                borderColor: "#3498db",
                backgroundColor: "rgba(52, 152, 219, 0.2)",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: "Date" } },
                y: { title: { display: true, text: "Stock Price (USD)" } }
            }
        }
    });
}
})
