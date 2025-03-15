// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS library
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
      mirror: false,
      offset: 120,
    })
  
    // Theme toggle functionality
    const themeToggle = document.querySelector(".theme-toggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark")
        const icon = themeToggle.querySelector("i")
        if (document.body.classList.contains("dark")) {
          icon.classList.remove("fa-moon")
          icon.classList.add("fa-sun")
          localStorage.setItem("theme", "dark")
        } else {
          icon.classList.remove("fa-sun")
          icon.classList.add("fa-moon")
          localStorage.setItem("theme", "light")
        }
      })
  
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme === "dark") {
        document.body.classList.add("dark")
        const icon = themeToggle.querySelector("i")
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
      }
    }
  
    // Mobile menu toggle
    const menuBtn = document.querySelector(".mobile-menu-btn")
    const mobileMenu = document.querySelector(".mobile-menu")
  
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        const spans = menuBtn.querySelectorAll("span")
  
        if (mobileMenu.classList.contains("active")) {
          spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
          spans[1].style.opacity = "0"
          spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
        } else {
          spans[0].style.transform = "none"
          spans[1].style.opacity = "1"
          spans[2].style.transform = "none"
        }
      })
    }
  
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll(".mobile-menu a")
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        const spans = menuBtn.querySelectorAll("span")
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      })
    })
  
    // Navbar scroll effect
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar")
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    })
  
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          const headerOffset = 80
          const elementPosition = target.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
  
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Portfolio view toggle
    const viewToggleBtns = document.querySelectorAll(".view-toggle button")
    if (viewToggleBtns.length) {
      viewToggleBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const view = btn.getAttribute("data-view")
  
          // Update active button
          viewToggleBtns.forEach((b) => b.classList.remove("active"))
          btn.classList.add("active")
  
          // Show selected view
          document.querySelectorAll(".portfolio-view").forEach((v) => {
            v.classList.remove("active")
          })
          document.querySelector(`.${view}-view`).classList.add("active")
        })
      })
    }
  
    // Calculator tabs
    const tabBtns = document.querySelectorAll(".tab-btn")
    if (tabBtns.length) {
      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const tab = btn.getAttribute("data-tab")
  
          // Update active button
          tabBtns.forEach((b) => b.classList.remove("active"))
          btn.classList.add("active")
  
          // Show selected tab
          document.querySelectorAll(".tab-content").forEach((t) => {
            t.classList.remove("active")
          })
          document.getElementById(`${tab}-tab`).classList.add("active")
        })
      })
    }
  
    // Open account modal
    const openAccountBtn = document.querySelector(".open-account-btn")
    const accountModal = document.getElementById("account-modal")
    if (openAccountBtn && accountModal) {
      openAccountBtn.addEventListener("click", () => {
        accountModal.classList.add("active")
      })
  
      // Close modal
      const closeBtn = accountModal.querySelector(".modal-close")
      closeBtn.addEventListener("click", () => {
        accountModal.classList.remove("active")
      })
  
      // Close modal when clicking outside
      accountModal.addEventListener("click", (e) => {
        if (e.target === accountModal) {
          accountModal.classList.remove("active")
        }
      })
  
      // Handle form submission
      const accountForm = document.getElementById("account-form")
      accountForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Simulate form submission
        const submitBtn = accountForm.querySelector('button[type="submit"]')
        submitBtn.disabled = true
        submitBtn.textContent = "Processing..."
  
        setTimeout(() => {
          accountModal.classList.remove("active")
          alert("Your application has been submitted successfully! Our team will contact you shortly.")
          accountForm.reset()
          submitBtn.disabled = false
          submitBtn.textContent = "Submit Application"
        }, 2000)
      })
    }
  
    // Initialize portfolio data
    loadPortfolioData()
  
    // Refresh portfolio button
    const refreshBtn = document.getElementById("refresh-portfolio")
    if (refreshBtn) {
      refreshBtn.addEventListener("click", function () {
        this.querySelector("i").classList.add("fa-spin")
        setTimeout(() => {
          loadPortfolioData()
          this.querySelector("i").classList.remove("fa-spin")
        }, 1000)
      })
    }
  
    // Initialize transaction data
    loadTransactionData()
  
    // Transaction filters
    const transactionType = document.getElementById("transaction-type")
    const transactionPeriod = document.getElementById("transaction-period")
  
    if (transactionType && transactionPeriod) {
      transactionType.addEventListener("change", loadTransactionData)
      transactionPeriod.addEventListener("change", loadTransactionData)
    }
  
    // Export transactions
    const exportBtn = document.getElementById("export-transactions")
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        alert("Transactions exported successfully!")
      })
    }
  
    // Page loader hide after everything is loaded
    window.addEventListener("load", () => {
      document.getElementById("page-loader").style.opacity = 0
      setTimeout(() => {
        document.getElementById("page-loader").style.display = "none"
      }, 500)
    })
  })
  
  // Toggle FAQ
  function toggleFAQ(element) {
    const answer = element.nextElementSibling
    const icon = element.querySelector(".faq-icon i")
    const isActive = answer.classList.contains("active")
  
    // Close all FAQs
    document.querySelectorAll(".faq-answer").forEach((item) => {
      item.classList.remove("active")
    })
    document.querySelectorAll(".faq-icon i").forEach((item) => {
      item.className = "fas fa-chevron-down"
    })
  
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
      answer.classList.add("active")
      icon.className = "fas fa-chevron-up"
    }
  }
  
  // Calculate brokerage
  function calculateBrokerage() {
    const tradeValue = Number.parseFloat(document.getElementById("trade-value").value)
    const brokerageRate = Number.parseFloat(document.getElementById("brokerage").value)
    const tradeType = document.getElementById("trade-type").value
  
    if (isNaN(tradeValue) || isNaN(brokerageRate)) {
      document.getElementById("brokerage-result").innerHTML = '<p class="error">Please enter valid numbers</p>'
      document.getElementById("brokerage-result").style.display = "block"
      return
    }
  
    // Calculate brokerage
    const brokerage = tradeValue * (brokerageRate / 100)
  
    // Calculate other charges based on trade type
    let stt = 0
    let exchangeCharges = 0
    let sebiCharges = 0
    let stampDuty = 0
  
    if (tradeType === "equity") {
      stt = tradeValue * 0.001 // 0.1% for delivery
      exchangeCharges = tradeValue * 0.0000325 // 0.00325%
      sebiCharges = tradeValue * 0.000002 // 0.0002%
      stampDuty = tradeValue * 0.00015 // 0.015%
    } else if (tradeType === "intraday") {
      stt = tradeValue * 0.00025 // 0.025% for intraday
      exchangeCharges = tradeValue * 0.0000325 // 0.00325%
      sebiCharges = tradeValue * 0.000002 // 0.0002%
      stampDuty = tradeValue * 0.00002 // 0.002%
    } else if (tradeType === "futures") {
      stt = tradeValue * 0.0001 // 0.01% for futures
      exchangeCharges = tradeValue * 0.00002 // 0.002%
      sebiCharges = tradeValue * 0.000002 // 0.0002%
      stampDuty = tradeValue * 0.00002 // 0.002%
    } else if (tradeType === "options") {
      stt = tradeValue * 0.0005 // 0.05% for options
      exchangeCharges = tradeValue * 0.00053 // 0.053%
      sebiCharges = tradeValue * 0.000002 // 0.0002%
      stampDuty = tradeValue * 0.00003 // 0.003%
    }
  
    const gst = (brokerage + exchangeCharges + sebiCharges) * 0.18 // 18% GST
    const totalCharges = brokerage + stt + exchangeCharges + sebiCharges + stampDuty + gst
    const netAmount = tradeValue - totalCharges
  
    const resultDiv = document.getElementById("brokerage-result")
    resultDiv.innerHTML = `
          <h3>Transaction Charges</h3>
          <div class="result-grid">
              <div class="result-item">
                  <p class="result-label">Trade Value:</p>
                  <p class="result-value">₹${tradeValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">Brokerage:</p>
                  <p class="result-value">₹${brokerage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">STT:</p>
                  <p class="result-value">₹${stt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">Exchange Charges:</p>
                  <p class="result-value">₹${exchangeCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">SEBI Charges:</p>
                  <p class="result-value">₹${sebiCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">Stamp Duty:</p>
                  <p class="result-value">₹${stampDuty.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">GST (18%):</p>
                  <p class="result-value">₹${gst.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item highlight">
                  <p class="result-label">Total Charges:</p>
                  <p class="result-value">₹${totalCharges.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item highlight">
                  <p class="result-label">Net Amount:</p>
                  <p class="result-value">₹${netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
          </div>
      `
    resultDiv.style.display = "block"
  }
  
  // Calculate investment returns
  function calculateReturns() {
    const amount = Number.parseFloat(document.getElementById("investment-amount").value)
    const years = Number.parseFloat(document.getElementById("investment-period").value)
    const returnRate = Number.parseFloat(document.getElementById("expected-return").value) / 100
    const frequency = document.getElementById("investment-frequency").value
  
    if (isNaN(amount) || isNaN(years) || isNaN(returnRate)) {
      document.getElementById("returns-result").innerHTML = '<p class="error">Please enter valid numbers</p>'
      document.getElementById("returns-result").style.display = "block"
      return
    }
  
    let futureValue = 0
    let totalInvestment = 0
  
    if (frequency === "lumpsum") {
      // Lump sum calculation
      futureValue = amount * Math.pow(1 + returnRate, years)
      totalInvestment = amount
    } else if (frequency === "monthly") {
      // Monthly SIP calculation
      const monthlyRate = returnRate / 12
      const months = years * 12
      futureValue = amount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
      totalInvestment = amount * months
    } else if (frequency === "quarterly") {
      // Quarterly calculation
      const quarterlyRate = returnRate / 4
      const quarters = years * 4
      futureValue = amount * ((Math.pow(1 + quarterlyRate, quarters) - 1) / quarterlyRate) * (1 + quarterlyRate)
      totalInvestment = amount * quarters
    } else if (frequency === "yearly") {
      // Yearly calculation
      futureValue = amount * ((Math.pow(1 + returnRate, years) - 1) / returnRate) * (1 + returnRate)
      totalInvestment = amount * years
    }
  
    const totalReturn = futureValue - totalInvestment
    const returnPercentage = (totalReturn / totalInvestment) * 100
  
    const resultDiv = document.getElementById("returns-result")
    resultDiv.innerHTML = `
          <h3>Investment Growth Projection</h3>
          <div class="result-grid">
              <div class="result-item">
                  <p class="result-label">Total Investment:</p>
                  <p class="result-value">₹${totalInvestment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">Expected Returns:</p>
                  <p class="result-value">₹${totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item highlight">
                  <p class="result-label">Future Value:</p>
                  <p class="result-value">₹${futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item highlight">
                  <p class="result-label">Return Percentage:</p>
                  <p class="result-value">${returnPercentage.toFixed(2)}%</p>
              </div>
          </div>
          <div class="result-note">
              <p>Note: This is a simplified calculation and does not account for inflation, taxes, or changing market conditions.</p>
          </div>
      `
    resultDiv.style.display = "block"
  }
  
  // Calculate capital gains tax
  function calculateTax() {
    const purchasePrice = Number.parseFloat(document.getElementById("purchase-price").value)
    const salePrice = Number.parseFloat(document.getElementById("sale-price").value)
    const quantity = Number.parseInt(document.getElementById("quantity").value)
    const holdingPeriod = document.getElementById("holding-period").value
  
    if (isNaN(purchasePrice) || isNaN(salePrice) || isNaN(quantity)) {
      document.getElementById("tax-result").innerHTML = '<p class="error">Please enter valid numbers</p>'
      document.getElementById("tax-result").style.display = "block"
      return
    }
  
    const totalPurchasePrice = purchasePrice * quantity
    const totalSalePrice = salePrice * quantity
    const capitalGain = totalSalePrice - totalPurchasePrice
  
    let taxRate = 0
    let taxAmount = 0
  
    if (capitalGain <= 0) {
      taxRate = 0
      taxAmount = 0
    } else if (holdingPeriod === "short") {
      // Short-term capital gains (assumed 15% for simplicity)
      taxRate = 15
      taxAmount = capitalGain * 0.15
    } else {
      // Long-term capital gains (assumed 10% for simplicity)
      taxRate = 10
      taxAmount = capitalGain * 0.1
    }
  
    const netProfit = capitalGain - taxAmount
  
    const resultDiv = document.getElementById("tax-result")
    resultDiv.innerHTML = `
          <h3>Capital Gains Tax Calculation</h3>
          <div class="result-grid">
              <div class="result-item">
                  <p class="result-label">Total Purchase Price:</p>
                  <p class="result-value">₹${totalPurchasePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">Total Sale Price:</p>
                  <p class="result-value">₹${totalSalePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">Capital Gain:</p>
                  <p class="result-value">₹${capitalGain.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">Tax Rate:</p>
                  <p class="result-value">${taxRate}%</p>
              </div>
              <div class="result-item highlight">
                  <p class="result-label">Tax Amount:</p>
                  <p class="result-value">₹${taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item highlight">
                  <p class="result-label">Net Profit After Tax:</p>
                  <p class="result-value">₹${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
          </div>
          <div class="result-note">
              <p>Note: This is a simplified calculation for educational purposes. Actual tax rates may vary based on your income bracket and local tax laws.</p>
          </div>
      `
    resultDiv.style.display = "block"
  }
  
  // Sample portfolio data
  const sampleStocks = [
    {
      id: "RELIANCE",
      name: "Reliance Industries",
      sector: "Oil & Gas",
      quantity: 50,
      avgPrice: 2450.75,
      currentPrice: 2580.3,
      dayChange: 1.2,
    },
    {
      id: "INFY",
      name: "Infosys Ltd",
      sector: "IT",
      quantity: 100,
      avgPrice: 1320.5,
      currentPrice: 1450.8,
      dayChange: 2.5,
    },
    {
      id: "HDFCBANK",
      name: "HDFC Bank",
      sector: "Banking",
      quantity: 75,
      avgPrice: 1650.25,
      currentPrice: 1580.4,
      dayChange: -0.8,
    },
    {
      id: "TCS",
      name: "Tata Consultancy Services",
      sector: "IT",
      quantity: 30,
      avgPrice: 3250.0,
      currentPrice: 3420.6,
      dayChange: 1.5,
    },
    {
      id: "ICICIBANK",
      name: "ICICI Bank",
      sector: "Banking",
      quantity: 120,
      avgPrice: 780.5,
      currentPrice: 850.3,
      dayChange: 0.9,
    },
  ]
  
  // Load portfolio data
  function loadPortfolioData() {
    // Table view
    const tableBody = document.getElementById("portfolio-data")
    if (tableBody) {
      tableBody.innerHTML = ""
  
      // Randomize the data slightly to simulate market changes
      const stocks = sampleStocks.map((stock) => {
        const priceChange = (Math.random() * 2 - 1) * (stock.currentPrice * 0.02)
        const dayChangeAdjustment = (Math.random() * 2 - 1) * 0.5
  
        return {
          ...stock,
          currentPrice: Number.parseFloat((stock.currentPrice + priceChange).toFixed(2)),
          dayChange: Number.parseFloat((stock.dayChange + dayChangeAdjustment).toFixed(1)),
        }
      })
  
      // Add rows to table
      stocks.forEach((stock) => {
        const value = stock.quantity * stock.currentPrice
        const investedValue = stock.quantity * stock.avgPrice
        const pl = value - investedValue
        const plPercentage = (pl / investedValue) * 100
  
        const plClass = pl >= 0 ? "positive" : "negative"
        const plIcon = pl >= 0 ? "fa-arrow-up" : "fa-arrow-down"
  
        const row = document.createElement("tr")
        row.innerHTML = `
                  <td>
                      <div class="stock-info">
                          <strong>${stock.name}</strong>
                          <span class="stock-id">${stock.id}</span>
                      </div>
                  </td>
                  <td>${stock.quantity}</td>
                  <td>₹${stock.avgPrice.toFixed(2)}</td>
                  <td>₹${stock.currentPrice.toFixed(2)} <span class="${stock.dayChange >= 0 ? "positive" : "negative"}"><i class="fas ${stock.dayChange >= 0 ? "fa-arrow-up" : "fa-arrow-down"}"></i> ${Math.abs(stock.dayChange)}%</span></td>
                  <td>₹${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  <td class="${plClass}"><i class="fas ${plIcon}"></i> ${Math.abs(plPercentage).toFixed(2)}%</td>
                  <td>
                      <button class="view-details-btn" data-id="${stock.id}"><i class="fas fa-eye"></i></button>
                  </td>
              `
  
        tableBody.appendChild(row)
      })
  
      // Add event listeners to view details buttons
      document.querySelectorAll(".view-details-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const stockId = this.getAttribute("data-id")
          showStockDetails(stockId)
        })
      })
  
      // Card view
      const stockCardsContainer = document.getElementById("stock-cards")
      if (stockCardsContainer) {
        stockCardsContainer.innerHTML = ""
  
        stocks.forEach((stock) => {
          const value = stock.quantity * stock.currentPrice
          const investedValue = stock.quantity * stock.avgPrice
          const pl = value - investedValue
          const plPercentage = (pl / investedValue) * 100
  
          const plClass = pl >= 0 ? "positive" : "negative"
          const plIcon = pl >= 0 ? "fa-arrow-up" : "fa-arrow-down"
  
          const card = document.createElement("div")
          card.className = "stock-card"
          card.innerHTML = `
                      <div class="stock-header">
                          <span class="stock-name">${stock.name}</span>
                          <span class="stock-sector">${stock.sector}</span>
                      </div>
                      <div class="stock-details">
                          <div class="stock-detail-item">
                              <span class="stock-detail-label">Quantity:</span>
                              <span class="stock-detail-value">${stock.quantity}</span>
                          </div>
                          <div class="stock-detail-item">
                              <span class="stock-detail-label">Avg. Price:</span>
                              <span class="stock-detail-value">₹${stock.avgPrice.toFixed(2)}</span>
                          </div>
                          <div class="stock-detail-item">
                              <span class="stock-detail-label">Current Price:</span>
                              <span class="stock-detail-value">₹${stock.currentPrice.toFixed(2)}</span>
                          </div>
                          <div class="stock-detail-item">
                              <span class="stock-detail-label">Value:</span>
                              <span class="stock-detail-value">₹${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                          </div>
                          <div class="stock-detail-item">
                              <span class="stock-detail-label">P&L:</span>
                              <span class="stock-detail-value ${plClass}"><i class="fas ${plIcon}"></i> ${Math.abs(plPercentage).toFixed(2)}%</span>
                          </div>
                      </div>
                      <div class="stock-actions">
                          <button class="stock-action-btn buy-btn"><i class="fas fa-plus"></i> Buy</button>
                          <button class="stock-action-btn sell-btn"><i class="fas fa-minus"></i> Sell</button>
                          <button class="stock-action-btn view-btn" data-id="${stock.id}"><i class="fas fa-chart-line"></i> Chart</button>
                      </div>
                  `
  
          stockCardsContainer.appendChild(card)
        })
  
        // Add event listeners to view buttons
        document.querySelectorAll(".view-btn").forEach((btn) => {
          btn.addEventListener("click", function () {
            const stockId = this.getAttribute("data-id")
            showStockDetails(stockId)
          })
        })
      }
  
      // Update summary
      updatePortfolioSummary(stocks)
    }
  }
  
  // Update portfolio summary
  function updatePortfolioSummary(stocks) {
    const totalStocks = stocks.length
  
    // Calculate total value and invested amount
    let totalValue = 0
    let investedAmount = 0
  
    stocks.forEach((stock) => {
      totalValue += stock.quantity * stock.currentPrice
      investedAmount += stock.quantity * stock.avgPrice
    })
  
    // Calculate profit/loss
    const profitLoss = totalValue - investedAmount
    const profitLossPercentage = (profitLoss / investedAmount) * 100
  
    // Find best performer
    let bestPerformer = stocks[0]
    stocks.forEach((stock) => {
      const currentPL = ((stock.currentPrice - stock.avgPrice) / stock.avgPrice) * 100
      const bestPL = ((bestPerformer.currentPrice - bestPerformer.avgPrice) / bestPerformer.avgPrice) * 100
  
      if (currentPL > bestPL) {
        bestPerformer = stock
      }
    })
  
    // Count unique sectors
    const sectors = new Set()
    stocks.forEach((stock) => {
      sectors.add(stock.sector)
    })
  
    // Update DOM
    document.getElementById("total-value").textContent = totalValue.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })
    document.getElementById("invested-amount").textContent = investedAmount.toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })
    document.getElementById("profit-loss").textContent = Math.abs(profitLoss).toLocaleString(undefined, {
      maximumFractionDigits: 0,
    })
  
    const plElement = document.querySelector(".profit-loss .value")
    const plChangeElement = document.querySelector(".profit-loss .change")
  
    if (profitLoss >= 0) {
      plElement.classList.add("positive")
      plElement.classList.remove("negative")
      plChangeElement.classList.add("positive")
      plChangeElement.classList.remove("negative")
      plChangeElement.innerHTML = `<i class="fas fa-arrow-up"></i> ${profitLossPercentage.toFixed(1)}% overall`
    } else {
      plElement.classList.add("negative")
      plElement.classList.remove("positive")
      plChangeElement.classList.add("negative")
      plChangeElement.classList.remove("positive")
      plChangeElement.innerHTML = `<i class="fas fa-arrow-down"></i> ${Math.abs(profitLossPercentage).toFixed(1)}% overall`
    }
  
    document.getElementById("total-stocks").textContent = totalStocks
    document.getElementById("total-sectors").textContent = sectors.size
    document.getElementById("best-performer").textContent = bestPerformer.name
  }
  
  // Show stock details
  function showStockDetails(stockId) {
    const stock = sampleStocks.find((s) => s.id === stockId)
    if (!stock) return
  
    const stockModal = document.getElementById("stock-modal")
    const modalTitle = document.getElementById("stock-modal-title")
    const modalContent = document.getElementById("stock-modal-content")
  
    modalTitle.textContent = `${stock.name} (${stock.id})`
  
    const value = stock.quantity * stock.currentPrice
    const investedValue = stock.quantity * stock.avgPrice
    const pl = value - investedValue
    const plPercentage = (pl / investedValue) * 100
  
    const plClass = pl >= 0 ? "positive" : "negative"
  
    modalContent.innerHTML = `
          <div class="stock-detail-section">
              <h4>Holdings Overview</h4>
              <div class="stock-detail-grid">
                  <div class="detail-item">
                      <span class="detail-label">Sector</span>
                      <span class="detail-value">${stock.sector}</span>
                  </div>
                  <div class="detail-item">
                      <span class="detail-label">Quantity</span>
                      <span class="detail-value">${stock.quantity}</span>
                  </div>
                  <div class="detail-item">
                      <span class="detail-label">Average Price</span>
                      <span class="detail-value">₹${stock.avgPrice.toFixed(2)}</span>
                  </div>
                  <div class="detail-item">
                      <span class="detail-label">Current Price</span>
                      <span class="detail-value">₹${stock.currentPrice.toFixed(2)}</span>
                  </div>
                  <div class="detail-item">
                      <span class="detail-label">Invested Value</span>
                      <span class="detail-value">₹${investedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div class="detail-item">
                      <span class="detail-label">Current Value</span>
                      <span class="detail-value">₹${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div class="detail-item">
                      <span class="detail-label">Profit/Loss</span>
                      <span class="detail-value ${plClass}">₹${Math.abs(pl).toLocaleString(undefined, { maximumFractionDigits: 0 })} (${pl >= 0 ? "+" : "-"}${Math.abs(plPercentage).toFixed(2)}%)</span>
                  </div>
              </div>
          </div>
          
          <div class="stock-chart-placeholder">
              <p>Stock price chart would be displayed here</p>
          </div>
          
          <div class="stock-actions-container">
              <button class="cta-button primary buy-more-btn"><i class="fas fa-plus"></i> Buy More</button>
              <button class="cta-button secondary sell-btn"><i class="fas fa-minus"></i> Sell</button>
          </div>
      `
  
    // Show modal
    stockModal.classList.add("active")
  
    // Close modal
    const closeBtn = stockModal.querySelector(".modal-close")
    closeBtn.addEventListener("click", () => {
      stockModal.classList.remove("active")
    })
  
    // Close modal when clicking outside
    stockModal.addEventListener("click", (e) => {
      if (e.target === stockModal) {
        stockModal.classList.remove("active")
      }
    })
  }
  
  // Sample transactions data
  const sampleTransactions = [
    {
      id: "TXN001",
      date: "2023-12-15",
      type: "buy",
      stock: "Reliance Industries",
      quantity: 20,
      price: 2420.5,
      total: 48410,
      status: "completed",
    },
    {
      id: "TXN002",
      date: "2023-12-20",
      type: "buy",
      stock: "Infosys Ltd",
      quantity: 50,
      price: 1310.75,
      total: 65537.5,
      status: "completed",
    },
    {
      id: "TXN003",
      date: "2024-01-05",
      type: "sell",
      stock: "HDFC Bank",
      quantity: 25,
      price: 1680.3,
      total: 42007.5,
      status: "completed",
    },
    {
      id: "TXN004",
      date: "2024-01-15",
      type: "dividend",
      stock: "TCS",
      quantity: 0,
      price: 0,
      total: 1800,
      status: "completed",
    },
    {
      id: "TXN005",
      date: "2024-01-25",
      type: "buy",
      stock: "ICICI Bank",
      quantity: 100,
      price: 775.4,
      total: 77540,
      status: "completed",
    },
    {
      id: "TXN006",
      date: "2024-02-10",
      type: "buy",
      stock: "TCS",
      quantity: 10,
      price: 3240.6,
      total: 32406,
      status: "completed",
    },
    {
      id: "TXN007",
      date: "2024-02-20",
      type: "sell",
      stock: "Infosys Ltd",
      quantity: 20,
      price: 1450.25,
      total: 29005,
      status: "completed",
    },
    {
      id: "TXN008",
      date: "2024-03-05",
      type: "dividend",
      stock: "Reliance Industries",
      quantity: 0,
      price: 0,
      total: 2500,
      status: "completed",
    },
    {
      id: "TXN009",
      date: "2024-03-15",
      type: "buy",
      stock: "HDFC Bank",
      quantity: 30,
      price: 1640.8,
      total: 49224,
      status: "pending",
    },
    {
      id: "TXN010",
      date: "2024-03-18",
      type: "sell",
      stock: "ICICI Bank",
      quantity: 50,
      price: 845.6,
      total: 42280,
      status: "failed",
    },
  ]
  
  // Load transaction data
  function loadTransactionData() {
    const tableBody = document.getElementById("transactions-data")
    if (!tableBody) return
  
    // Get filter values
    const typeFilter = document.getElementById("transaction-type").value
    const periodFilter = document.getElementById("transaction-period").value
  
    // Filter transactions
    let filteredTransactions = [...sampleTransactions]
  
    if (typeFilter !== "all") {
      filteredTransactions = filteredTransactions.filter((txn) => txn.type === typeFilter)
    }
  
    if (periodFilter !== "all") {
      const today = new Date()
      const cutoffDate = new Date()
  
      if (periodFilter === "1m") {
        cutoffDate.setMonth(today.getMonth() - 1)
      } else if (periodFilter === "3m") {
        cutoffDate.setMonth(today.getMonth() - 3)
      } else if (periodFilter === "6m") {
        cutoffDate.setMonth(today.getMonth() - 6)
      } else if (periodFilter === "1y") {
        cutoffDate.setFullYear(today.getFullYear() - 1)
      }
  
      filteredTransactions = filteredTransactions.filter((txn) => new Date(txn.date) >= cutoffDate)
    }
  
    // Sort by date (newest first)
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
  
    // Clear table
    tableBody.innerHTML = ""
  
    // Add rows to table
    filteredTransactions.forEach((txn) => {
      const row = document.createElement("tr")
  
      let typeClass = ""
      let typeIcon = ""
  
      if (txn.type === "buy") {
        typeClass = "positive"
        typeIcon = "fa-arrow-down"
      } else if (txn.type === "sell") {
        typeClass = "negative"
        typeIcon = "fa-arrow-up"
      } else if (txn.type === "dividend") {
        typeClass = "positive"
        typeIcon = "fa-gift"
      }
  
      let statusClass = ""
      if (txn.status === "completed") {
        statusClass = "status-completed"
      } else if (txn.status === "pending") {
        statusClass = "status-pending"
      } else if (txn.status === "failed") {
        statusClass = "status-failed"
      }
  
      row.innerHTML = `
              <td>${formatDate(txn.date)}</td>
              <td><span class="${typeClass}"><i class="fas ${typeIcon}"></i> ${capitalizeFirstLetter(txn.type)}</span></td>
              <td>${txn.stock}</td>
              <td>${txn.quantity}</td>
              <td>${txn.type === "dividend" ? "-" : "₹" + txn.price.toFixed(2)}</td>
              <td>₹${txn.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
              <td><span class="status-badge ${statusClass}">${capitalizeFirstLetter(txn.status)}</span></td>
          `
  
      tableBody.appendChild(row)
    })
  }
  
  // Helper functions
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-IN", options)
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  
  