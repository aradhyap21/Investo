import { Chart } from "@/components/ui/chart"
// Page loader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("pageLoader").classList.add("loader-hidden")
    document.body.classList.add("loaded")
  }, 1500) // Show loader for 1.5 seconds
})

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (mobileMenuToggle && mobileMenuClose && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.add("active")
      document.body.style.overflow = "hidden"
    })

    mobileMenuClose.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = ""
    })

    // Close mobile menu when clicking outside
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenuClose.click()
      }
    })
  }

  // User profile dropdown
  const userProfile = document.querySelector(".user-profile")
  const dropdownMenu = document.querySelector(".dropdown-menu")

  if (userProfile && dropdownMenu) {
    userProfile.addEventListener("click", (e) => {
      e.stopPropagation()
      userProfile.classList.toggle("active")
      dropdownMenu.classList.toggle("active")
    })

    // Close dropdown when clicking elsewhere
    document.addEventListener("click", () => {
      userProfile.classList.remove("active")
      dropdownMenu.classList.remove("active")
    })
  }

  // Tab buttons
  const tabBtns = document.querySelectorAll(".tab-btn")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabGroup = this.closest(".tabs-header") || this.closest(".section-actions")
      const tabContents = document.querySelectorAll(".tab-content")
      const tabName = this.getAttribute("data-tab")

      // Remove active class from all buttons in this group
      tabGroup.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.remove("active")
      })

      // Add active class to clicked button
      this.classList.add("active")

      // If this is in a modal with tab content
      if (tabContents.length > 0) {
        tabContents.forEach((content) => {
          content.classList.remove("active")
        })

        document.getElementById(tabName + "Tab")?.classList.add("active")
      } else {
        // This is for the main fund list filtering
        filterFunds(tabName)
      }
    })
  })

  // Initialize portfolio summary counters with animation
  animateCounter("totalInvestment", 0, 250000, 2000)
  animateCounter("currentValue", 0, 287500, 2000)
  animateCounter("monthlySIP", 0, 15000, 2000)
  animateCounter("taxSaved", 0, 35000, 2000)

  // Initialize SIP calculator
  initSIPCalculator()

  // Initialize fund comparison tool
  initFundComparison()

  // Initialize fund list
  setTimeout(() => {
    renderFunds(funds)
    populateFundSelectors()
  }, 1800)
})

// Counter animation function
function animateCounter(elementId, start, end, duration) {
  const element = document.getElementById(elementId)
  if (!element) return

  let startTime = null
  const step = (timestamp) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    const value = Math.floor(progress * (end - start) + start)

    // Format as Indian currency
    const formattedValue = new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value)

    element.textContent = "₹" + formattedValue

    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}

// Sample fund data with expanded details
const funds = [
  {
    id: 1,
    name: "Growth Equity Fund",
    category: "equity",
    risk: "high",
    nav: 45.67,
    returns1Y: 15.8,
    returns3Y: 42.5,
    description: "Focuses on capital appreciation through investments in high-growth companies.",
    aum: "1,234 Cr",
    manager: "John Smith",
    launchDate: "15 Jan 2010",
    expenseRatio: 1.2,
    minInvestment: 5000,
    minSIP: 1000,
    exitLoad: "1% for redemption within 1 year",
    stdDev: 14.2,
    beta: 1.05,
    sharpe: 0.85,
    alpha: 2.3,
    returns: {
      "1M": 2.3,
      "3M": 5.7,
      "6M": 8.2,
      "1Y": 15.8,
      "3Y": 45.2,
      "5Y": 76.5,
    },
    holdings: [
      { company: "HDFC Bank", sector: "Banking", percentage: 8.5 },
      { company: "Reliance Industries", sector: "Energy", percentage: 7.2 },
      { company: "Infosys", sector: "IT", percentage: 6.8 },
      { company: "TCS", sector: "IT", percentage: 5.9 },
      { company: "ICICI Bank", sector: "Banking", percentage: 5.2 },
      { company: "Axis Bank", sector: "Banking", percentage: 4.7 },
      { company: "Larsen & Toubro", sector: "Construction", percentage: 4.3 },
      { company: "Kotak Mahindra Bank", sector: "Banking", percentage: 3.9 },
      { company: "HUL", sector: "FMCG", percentage: 3.5 },
      { company: "Bharti Airtel", sector: "Telecom", percentage: 3.2 },
    ],
  },
  {
    id: 2,
    name: "Blue Chip Fund",
    category: "equity",
    risk: "moderate",
    nav: 89.12,
    returns1Y: 12.5,
    returns3Y: 38.2,
    description: "Invests in well-established companies with stable earnings and dividends.",
    aum: "3,567 Cr",
    manager: "Sarah Johnson",
    launchDate: "05 Mar 2008",
    expenseRatio: 1.0,
    minInvestment: 5000,
    minSIP: 1000,
    exitLoad: "1% for redemption within 1 year",
    stdDev: 12.8,
    beta: 0.95,
    sharpe: 0.92,
    alpha: 1.8,
    returns: {
      "1M": 1.8,
      "3M": 4.9,
      "6M": 7.5,
      "1Y": 12.5,
      "3Y": 38.2,
      "5Y": 65.3,
    },
  },
  {
    id: 3,
    name: "Government Securities Fund",
    category: "debt",
    risk: "low",
    nav: 32.45,
    returns1Y: 6.7,
    returns3Y: 19.8,
    description: "Invests primarily in government securities and treasury bills.",
    aum: "1,890 Cr",
    manager: "Robert Chen",
    launchDate: "12 Jun 2012",
    expenseRatio: 0.8,
    minInvestment: 5000,
    minSIP: 1000,
    exitLoad: "Nil",
    stdDev: 3.2,
    beta: 0.15,
    sharpe: 1.05,
    alpha: 0.5,
    returns: {
      "1M": 0.6,
      "3M": 1.8,
      "6M": 3.5,
      "1Y": 6.7,
      "3Y": 19.8,
      "5Y": 32.5,
    },
  },
  {
    id: 4,
    name: "Corporate Bond Fund",
    category: "debt",
    risk: "moderate",
    nav: 28.9,
    returns1Y: 7.2,
    returns3Y: 21.5,
    description: "Focuses on corporate bonds and debentures for regular income.",
    aum: "2,345 Cr",
    manager: "Priya Sharma",
    launchDate: "23 Sep 2011",
    expenseRatio: 0.9,
    minInvestment: 5000,
    minSIP: 1000,
    exitLoad: "0.5% for redemption within 6 months",
    stdDev: 4.5,
    beta: 0.25,
    sharpe: 0.98,
    alpha: 0.7,
    returns: {
      "1M": 0.7,
      "3M": 2.1,
      "6M": 3.8,
      "1Y": 7.2,
      "3Y": 21.5,
      "5Y": 35.8,
    },
  },
  {
    id: 5,
    name: "Balanced Advantage Fund",
    category: "hybrid",
    risk: "moderate",
    nav: 42.3,
    returns1Y: 9.5,
    returns3Y: 28.7,
    description: "Dynamic asset allocation between equity and debt based on market conditions.",
    aum: "4,567 Cr",
    manager: "Michael Wong",
    launchDate: "18 Apr 2015",
    expenseRatio: 1.1,
    minInvestment: 5000,
    minSIP: 1000,
    exitLoad: "1% for redemption within 1 year",
    stdDev: 8.5,
    beta: 0.65,
    sharpe: 0.88,
    alpha: 1.2,
    returns: {
      "1M": 1.2,
      "3M": 3.5,
      "6M": 5.8,
      "1Y": 9.5,
      "3Y": 28.7,
      "5Y": 48.2,
    },
  },
  {
    id: 6,
    name: "Nifty Index Fund",
    category: "index",
    risk: "moderate",
    nav: 156.78,
    returns1Y: 11.2,
    returns3Y: 34.5,
    description: "Passively tracks the Nifty 50 index composition and performance.",
    aum: "5,678 Cr",
    manager: "Vikram Mehta",
    launchDate: "07 Jan 2010",
    expenseRatio: 0.5,
    minInvestment: 5000,
    minSIP: 500,
    exitLoad: "Nil",
    stdDev: 11.5,
    beta: 1.0,
    sharpe: 0.78,
    alpha: 0.0,
    returns: {
      "1M": 1.5,
      "3M": 4.2,
      "6M": 6.8,
      "1Y": 11.2,
      "3Y": 34.5,
      "5Y": 58.7,
    },
  },
  {
    id: 7,
    name: "Small Cap Opportunities",
    category: "equity",
    risk: "high",
    nav: 38.45,
    returns1Y: 18.9,
    returns3Y: 48.7,
    description: "Invests in small-cap companies with high growth potential.",
    aum: "1,456 Cr",
    manager: "Anjali Desai",
    launchDate: "15 May 2016",
    expenseRatio: 1.5,
    minInvestment: 5000,
    minSIP: 1000,
    exitLoad: "1% for redemption within 1 year",
    stdDev: 18.5,
    beta: 1.25,
    sharpe: 0.75,
    alpha: 3.2,
    returns: {
      "1M": 2.8,
      "3M": 6.5,
      "6M": 10.2,
      "1Y": 18.9,
      "3Y": 48.7,
      "5Y": 85.3,
    },
  },
  {
    id: 8,
    name: "Banking Sector Fund",
    category: "equity",
    risk: "high",
    nav: 65.32,
    returns1Y: 14.3,
    returns3Y: 39.8,
    description: "Sector-specific fund focusing on banking and financial services.",
    aum: "2,345 Cr",
    manager: "Rajiv Kapoor",
    launchDate: "28 Feb 2013",
    expenseRatio: 1.3,
    minInvestment: 5000,
    minSIP: 1000,
    exitLoad: "1% for redemption within 1 year",
    stdDev: 16.2,
    beta: 1.15,
    sharpe: 0.82,
    alpha: 2.5,
    returns: {
      "1M": 2.1,
      "3M": 5.8,
      "6M": 8.9,
      "1Y": 14.3,
      "3Y": 39.8,
      "5Y": 68.5,
    },
  },
  {
    id: 9,
    name: "Liquid Fund",
    category: "debt",
    risk: "low",
    nav: 22.15,
    returns1Y: 4.8,
    returns3Y: 14.5,
    description: "Invests in short-term money market instruments for high liquidity.",
    aum: "8,765 Cr",
    manager: "Sanjay Gupta",
    launchDate: "10 Nov 2009",
    expenseRatio: 0.4,
    minInvestment: 10000,
    minSIP: 1000,
    exitLoad: "Nil",
    stdDev: 0.8,
    beta: 0.05,
    sharpe: 1.25,
    alpha: 0.2,
    returns: {
      "1M": 0.4,
      "3M": 1.2,
      "6M": 2.4,
      "1Y": 4.8,
      "3Y": 14.5,
      "5Y": 24.2,
    },
  },
]

// Function to render fund list with animations\
function renderFunds(filteredF  24.2
}
  }
]

// Function to render fund list with animations
function renderFunds(filteredFunds) {
  const fundListContent = document.getElementById("fundListContent")
  fundListContent.innerHTML = ""

  if (filteredFunds.length === 0) {
    const noResults = document.createElement("div")
    noResults.className = "no-results"
    noResults.innerHTML = "No funds match your search criteria. Try adjusting your filters."
    fundListContent.appendChild(noResults)
    return
  }

  filteredFunds.forEach((fund, index) => {
    const fundElement = document.createElement("div")
    fundElement.className = "fund-item"
    fundElement.style.opacity = "0"
    fundElement.style.transform = "translateY(10px)"
    fundElement.style.transition = "opacity 0.3s ease, transform 0.3s ease"
    fundElement.style.transitionDelay = `${index * 0.05}s`

    fundElement.innerHTML = `
      <div class="tooltip">
        ${fund.name}
        <span class="tooltip-text">${fund.description}</span>
      </div>
      <div>₹${fund.nav.toFixed(2)}</div>
      <div class="${fund.returns1Y >= 0 ? "returns-positive" : "returns-negative"}">
        ${fund.returns1Y}%
      </div>
      <div class="${fund.returns3Y >= 0 ? "returns-positive" : "returns-negative"}">
        ${fund.returns3Y}%
      </div>
      <div>${fund.risk.charAt(0).toUpperCase() + fund.risk.slice(1)}</div>
      <div>
        <button class="invest-btn" data-fund-id="${fund.id}">Invest</button>
      </div>
    `
    fundListContent.appendChild(fundElement)

    // Trigger animation after a small delay
    setTimeout(() => {
      fundElement.style.opacity = "1"
      fundElement.style.transform = "translateY(0)"
    }, 10)
  })

  // Add event listeners to invest buttons
  document.querySelectorAll(".invest-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const fundId = this.getAttribute("data-fund-id")
      openFundDetailModal(fundId)
    })
  })
}

// Filter functionality with animation
function filterFunds(category = "all") {
  const categoryFilter = category || document.getElementById("categoryFilter").value
  const riskFilter = document.getElementById("riskFilter").value
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()

  const filteredFunds = funds.filter((fund) => {
    const matchesCategory = categoryFilter === "all" || fund.category === categoryFilter
    const matchesRisk = riskFilter === "all" || fund.risk === riskFilter
    const matchesSearch = fund.name.toLowerCase().includes(searchTerm)
    return matchesCategory && matchesRisk && matchesSearch
  })

  // Fade out current list
  const fundListContent = document.getElementById("fundListContent")
  fundListContent.style.opacity = "0"

  // Render new list after fade out
  setTimeout(() => {
    renderFunds(filteredFunds)
    fundListContent.style.opacity = "1"
  }, 300)
}

// Add event listeners for filters
document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("categoryFilter")
  const riskFilter = document.getElementById("riskFilter")
  const searchInput = document.getElementById("searchInput")

  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => filterFunds())
  }

  if (riskFilter) {
    riskFilter.addEventListener("change", () => filterFunds())
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => filterFunds())
  }

  // Add click handlers for category cards
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", function () {
      const categoryHeading = this.querySelector("h3").textContent.trim().split(" ")[0].toLowerCase()

      // Update category filter dropdown
      if (categoryFilter) {
        categoryFilter.value =
          categoryHeading === "index"
            ? "index"
            : categoryHeading === "debt"
              ? "debt"
              : categoryHeading === "hybrid"
                ? "hybrid"
                : "equity"
      }

      // Add visual feedback
      document.querySelectorAll(".category-card").forEach((c) => {
        c.style.transform = ""
        c.style.boxShadow = ""
      })

      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "var(--shadow-md)"

      // Filter funds
      filterFunds()
    })
  })
})

// SIP Calculator functionality
function initSIPCalculator() {
  const monthlyInvestment = document.getElementById("monthlyInvestment")
  const investmentPeriod = document.getElementById("investmentPeriod")
  const expectedReturn = document.getElementById("expectedReturn")
  const investmentRange = document.getElementById("investmentRange")
  const periodRange = document.getElementById("periodRange")
  const returnRange = document.getElementById("returnRange")
  const calculateBtn = document.getElementById("calculateBtn")

  if (!monthlyInvestment || !investmentPeriod || !expectedReturn || !calculateBtn) return

  // Sync input fields with range sliders
  function syncInputs() {
    if (investmentRange) investmentRange.value = monthlyInvestment.value
    if (periodRange) periodRange.value = investmentPeriod.value
    if (returnRange) returnRange.value = expectedReturn.value
  }

  function syncRanges() {
    if (monthlyInvestment) monthlyInvestment.value = investmentRange.value
    if (investmentPeriod) investmentPeriod.value = periodRange.value
    if (expectedReturn) expectedReturn.value = returnRange.value
  }

  // Initial sync
  syncInputs()

  // Add event listeners
  if (monthlyInvestment) monthlyInvestment.addEventListener("input", syncInputs)
  if (investmentPeriod) investmentPeriod.addEventListener("input", syncInputs)
  if (expectedReturn) expectedReturn.addEventListener("input", syncInputs)

  if (investmentRange) investmentRange.addEventListener("input", syncRanges)
  if (periodRange) periodRange.addEventListener("input", syncRanges)
  if (returnRange) returnRange.addEventListener("input", syncRanges)

  // Calculate button
  calculateBtn.addEventListener("click", calculateSIP)

  // Initial calculation
  calculateSIP()
}

function calculateSIP() {
  const monthlyInvestment = Number.parseFloat(document.getElementById("monthlyInvestment").value)
  const investmentPeriod = Number.parseFloat(document.getElementById("investmentPeriod").value)
  const expectedReturn = Number.parseFloat(document.getElementById("expectedReturn").value)

  // Calculate SIP returns
  const monthlyRate = expectedReturn / (12 * 100)
  const months = investmentPeriod * 12
  const investedAmount = monthlyInvestment * months

  // Future Value calculation using compound interest formula
  const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
  const estimatedReturns = futureValue - investedAmount

  // Update results
  document.getElementById("investedAmount").textContent = "₹" + Math.round(investedAmount).toLocaleString("en-IN")
  document.getElementById("estimatedReturns").textContent = "₹" + Math.round(estimatedReturns).toLocaleString("en-IN")
  document.getElementById("totalValue").textContent = "₹" + Math.round(futureValue).toLocaleString("en-IN")

  // Update chart
  updateSIPChart(investedAmount, estimatedReturns)
}

function updateSIPChart(investedAmount, estimatedReturns) {
  const ctx = document.getElementById("resultChart")

  if (!ctx) return

  // Destroy existing chart if it exists
  if (window.sipChart) {
    window.sipChart.destroy()
  }

  // Create new chart
  window.sipChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Invested Amount", "Estimated Returns"],
      datasets: [
        {
          data: [investedAmount, estimatedReturns],
          backgroundColor: ["rgba(79, 70, 229, 0.8)", "rgba(16, 185, 129, 0.8)"],
          borderColor: ["rgba(79, 70, 229, 1)", "rgba(16, 185, 129, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw
              return context.label + ": ₹" + Math.round(value).toLocaleString("en-IN")
            },
          },
        },
      },
    },
  })
}

// Fund Comparison Tool
function initFundComparison() {
  const fund1Selector = document.getElementById("fund1Selector")
  const fund2Selector = document.getElementById("fund2Selector")
  const compareFundsBtn = document.getElementById("compareFundsBtn")

  if (!fund1Selector || !fund2Selector || !compareFundsBtn) return

  // Enable/disable compare button based on selections
  function checkSelections() {
    if (fund1Selector.value && fund2Selector.value && fund1Selector.value !== fund2Selector.value) {
      compareFundsBtn.disabled = false
    } else {
      compareFundsBtn.disabled = true
    }
  }

  fund1Selector.addEventListener("change", checkSelections)
  fund2Selector.addEventListener("change", checkSelections)

  compareFundsBtn.addEventListener("click", compareFunds)
}

function populateFundSelectors() {
  const fund1Selector = document.getElementById("fund1Selector")
  const fund2Selector = document.getElementById("fund2Selector")

  if (!fund1Selector || !fund2Selector) return

  // Clear existing options except the first one
  fund1Selector.innerHTML = '<option value="">Select a fund</option>'
  fund2Selector.innerHTML = '<option value="">Select a fund</option>'

  // Add fund options
  funds.forEach((fund) => {
    const option1 = document.createElement("option")
    option1.value = fund.id
    option1.textContent = fund.name
    fund1Selector.appendChild(option1)

    const option2 = document.createElement("option")
    option2.value = fund.id
    option2.textContent = fund.name
    fund2Selector.appendChild(option2)
  })
}

function compareFunds() {
  const fund1Id = document.getElementById("fund1Selector").value
  const fund2Id = document.getElementById("fund2Selector").value
  const comparisonResults = document.getElementById("comparisonResults")

  if (!comparisonResults) return

  const fund1 = funds.find((f) => f.id == fund1Id)
  const fund2 = funds.find((f) => f.id == fund2Id)

  if (!fund1 || !fund2) return

  // Show comparison results
  comparisonResults.classList.remove("hidden")

  // Create comparison HTML
  comparisonResults.innerHTML = `
    <div class="comparison-header">
      <h3>Fund Comparison</h3>
      <p>Compare key metrics between selected funds</p>
    </div>
    
    <div class="comparison-table">
      <div class="comparison-row header">
        <div>Metric</div>
        <div>${fund1.name}</div>
        <div>${fund2.name}</div>
      </div>
      <div class="comparison-row">
        <div>Category</div>
        <div>${fund1.category.charAt(0).toUpperCase() + fund1.category.slice(1)}</div>
        <div>${fund2.category.charAt(0).toUpperCase() + fund2.category.slice(1)}</div>
      </div>
      <div class="comparison-row">
        <div>Risk Level</div>
        <div>${fund1.risk.charAt(0).toUpperCase() + fund1.risk.slice(1)}</div>
        <div>${fund2.risk.charAt(0).toUpperCase() + fund2.risk.slice(1)}</div>
      </div>
      <div class="comparison-row">
        <div>NAV</div>
        <div>₹${fund1.nav.toFixed(2)}</div>
        <div>₹${fund2.nav.toFixed(2)}</div>
      </div>
      <div class="comparison-row">
        <div>1 Year Returns</div>
        <div class="${fund1.returns1Y >= 0 ? "positive" : "negative"}">${fund1.returns1Y}%</div>
        <div class="${fund2.returns1Y >= 0 ? "positive" : "negative"}">${fund2.returns1Y}%</div>
      </div>
      <div class="comparison-row">
        <div>3 Year Returns</div>
        <div class="${fund1.returns3Y >= 0 ? "positive" : "negative"}">${fund1.returns3Y}%</div>
        <div class="${fund2.returns3Y >= 0 ? "positive" : "negative"}">${fund2.returns3Y}%</div>
      </div>
      <div class="comparison-row">
        <div>Expense Ratio</div>
        <div>${fund1.expenseRatio}%</div>
        <div>${fund2.expenseRatio}%</div>
      </div>
    </div>
    
    <div class="comparison-chart-container">
      <canvas id="comparisonChart"></canvas>
    </div>
    
    <div class="comparison-actions">
      <button class="invest-btn" data-fund-id="${fund1.id}">Invest in ${fund1.name}</button>
      <button class="invest-btn" data-fund-id="${fund2.id}">Invest in ${fund2.name}</button>
    </div>
  `

  // Create comparison chart
  createComparisonChart(fund1, fund2)

  // Add event listeners to invest buttons
  comparisonResults.querySelectorAll(".invest-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const fundId = this.getAttribute("data-fund-id")
      openFundDetailModal(fundId)
    })
  })

  // Scroll to results
  comparisonResults.scrollIntoView({ behavior: "smooth" })
}

function createComparisonChart(fund1, fund2) {
  const ctx = document.getElementById("comparisonChart")

  if (!ctx) return

  // Destroy existing chart if it exists
  if (window.comparisonChart) {
    window.comparisonChart.destroy()
  }

  // Create new chart
  window.comparisonChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["1 Month", "3 Months", "6 Months", "1 Year", "3 Years", "5 Years"],
      datasets: [
        {
          label: fund1.name,
          data: [
            fund1.returns["1M"],
            fund1.returns["3M"],
            fund1.returns["6M"],
            fund1.returns["1Y"],
            fund1.returns["3Y"],
            fund1.returns["5Y"],
          ],
          backgroundColor: "rgba(79, 70, 229, 0.7)",
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 1,
        },
        {
          label: fund2.name,
          data: [
            fund2.returns["1M"],
            fund2.returns["3M"],
            fund2.returns["6M"],
            fund2.returns["1Y"],
            fund2.returns["3Y"],
            fund2.returns["5Y"],
          ],
          backgroundColor: "rgba(16, 185, 129, 0.7)",
          borderColor: "rgba(16, 185, 129, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Returns (%)",
          },
        },
      },
    },
  })
}

// Fund Detail Modal
function openFundDetailModal(fundId) {
  const fund = funds.find((f) => f.id == fundId)
  if (!fund) return

  const modal = document.getElementById("fundDetailModal")
  if (!modal) return

  // Populate modal with fund details
  document.getElementById("modalFundName").textContent = fund.name
  document.getElementById("modalCategory").textContent = fund.category.charAt(0).toUpperCase() + fund.category.slice(1)
  document.getElementById("modalRisk").textContent = fund.risk.charAt(0).toUpperCase() + fund.risk.slice(1)
  document.getElementById("modalNAV").textContent = "₹" + fund.nav.toFixed(2)
  document.getElementById("modalAUM").textContent = "₹" + fund.aum

  // Performance metrics
  document.getElementById("modal1M").textContent = fund.returns["1M"] + "%"
  document.getElementById("modal1M").className = "value " + (fund.returns["1M"] >= 0 ? "positive" : "negative")

  document.getElementById("modal3M").textContent = fund.returns["3M"] + "%"
  document.getElementById("modal3M").className = "value " + (fund.returns["3M"] >= 0 ? "positive" : "negative")

  document.getElementById("modal6M").textContent = fund.returns["6M"] + "%"
  document.getElementById("modal6M").className = "value " + (fund.returns["6M"] >= 0 ? "positive" : "negative")

  document.getElementById("modal1Y").textContent = fund.returns["1Y"] + "%"
  document.getElementById("modal1Y").className = "value " + (fund.returns["1Y"] >= 0 ? "positive" : "negative")

  document.getElementById("modal3Y").textContent = fund.returns["3Y"] + "%"
  document.getElementById("modal3Y").className = "value " + (fund.returns["3Y"] >= 0 ? "positive" : "negative")

  document.getElementById("modal5Y").textContent = fund.returns["5Y"] + "%"
  document.getElementById("modal5Y").className = "value " + (fund.returns["5Y"] >= 0 ? "positive" : "negative")

  // Overview tab
  document.getElementById("modalDescription").textContent = fund.description
  document.getElementById("modalManager").textContent = fund.manager
  document.getElementById("modalLaunchDate").textContent = fund.launchDate
  document.getElementById("modalExpenseRatio").textContent = fund.expenseRatio + "%"
  document.getElementById("modalMinInvestment").textContent = "₹" + fund.minInvestment.toLocaleString("en-IN")
  document.getElementById("modalMinSIP").textContent = "₹" + fund.minSIP.toLocaleString("en-IN")
  document.getElementById("modalExitLoad").textContent = fund.exitLoad

  // Risk tab
  document.getElementById("modalStdDev").textContent = fund.stdDev + "%"
  document.getElementById("modalBeta").textContent = fund.beta
  document.getElementById("modalSharpe").textContent = fund.sharpe
  document.getElementById("modalAlpha").textContent = fund.alpha + "%"

  // Create performance chart
  createPerformanceChart(fund)

  // Create holdings chart if fund has holdings
  if (fund.holdings) {
    createHoldingsChart(fund)
    populateHoldings(fund)
  }

  // Create returns comparison chart
  createReturnsComparisonChart(fund)

  // Create risk-return chart
  createRiskReturnChart()

  // Show modal
  modal.classList.add("active")

  // Close modal when clicking close button or outside
  const closeBtn = modal.querySelector(".modal-close")
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active")
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })

  // Tab functionality
  const tabBtns = modal.querySelectorAll(".tab-btn")
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab")

      // Remove active class from all buttons
      tabBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      // Hide all tab contents
      const tabContents = modal.querySelectorAll(".tab-content")
      tabContents.forEach((content) => content.classList.remove("active"))

      // Show selected tab content
      document.getElementById(tabName + "Tab").classList.add("active")
    })
  })

  // Investment buttons
  const investBtns = modal.querySelectorAll(".invest-btn")
  investBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      showSuccessModal(fund)
      modal.classList.remove("active")
    })
  })
}

function createPerformanceChart(fund) {
  const ctx = document.getElementById("fundPerformanceChart")

  if (!ctx) return

  // Destroy existing chart if it exists
  if (window.performanceChart) {
    window.performanceChart.destroy()
  }

  // Create new chart
  window.performanceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["1 Month", "3 Months", "6 Months", "1 Year", "3 Years", "5 Years"],
      datasets: [
        {
          label: fund.name,
          data: [
            fund.returns["1M"],
            fund.returns["3M"],
            fund.returns["6M"],
            fund.returns["1Y"],
            fund.returns["3Y"],
            fund.returns["5Y"],
          ],
          backgroundColor: "rgba(79, 70, 229, 0.1)",
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Returns (%)",
          },
        },
      },
    },
  })
}

function createHoldingsChart(fund) {
  const ctx = document.getElementById("holdingsChart")

  if (!ctx || !fund.holdings) return

  // Destroy existing chart if it exists
  if (window.holdingsChart) {
    window.holdingsChart.destroy()
  }

  // Group holdings by sector
  const sectors = {}
  fund.holdings.forEach((holding) => {
    if (sectors[holding.sector]) {
      sectors[holding.sector] += holding.percentage
    } else {
      sectors[holding.sector] = holding.percentage
    }
  })

  // Create data for chart
  const labels = Object.keys(sectors)
  const data = Object.values(sectors)

  // Create color array
  const colors = [
    "rgba(79, 70, 229, 0.8)",
    "rgba(16, 185, 129, 0.8)",
    "rgba(245, 158, 11, 0.8)",
    "rgba(239, 68, 68, 0.8)",
    "rgba(99, 102, 241, 0.8)",
    "rgba(236, 72, 153, 0.8)",
    "rgba(6, 182, 212, 0.8)",
    "rgba(168, 85, 247, 0.8)",
    "rgba(59, 130, 246, 0.8)",
    "rgba(249, 115, 22, 0.8)",
  ]

  // Create new chart
  window.holdingsChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.8", "1")),
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw
              return context.label + ": " + value.toFixed(1) + "%"
            },
          },
        },
      },
    },
  })
}

function populateHoldings(fund) {
  const topHoldingsList = document.getElementById("topHoldingsList")

  if (!topHoldingsList || !fund.holdings) return

  topHoldingsList.innerHTML = ""

  fund.holdings.forEach((holding) => {
    const holdingElement = document.createElement("div")
    holdingElement.className = "holding-item"
    holdingElement.innerHTML = `
      <div>${holding.company}</div>
      <div>${holding.sector}</div>
      <div>${holding.percentage}%</div>
    `
    topHoldingsList.appendChild(holdingElement)
  })
}

function createReturnsComparisonChart(fund) {
  const ctx = document.getElementById("returnsComparisonChart")

  if (!ctx) return

  // Destroy existing chart if it exists
  if (window.returnsComparisonChart) {
    window.returnsComparisonChart.destroy()
  }

  // Create benchmark and category average data (simulated)
  const benchmarkData = [
    fund.returns["1M"] - 0.2,
    fund.returns["3M"] - 0.5,
    fund.returns["6M"] - 0.8,
    fund.returns["1Y"] - 1.2,
    fund.returns["3Y"] - 3.5,
    fund.returns["5Y"] - 5.8,
  ]

  const categoryAvgData = [
    fund.returns["1M"] - 0.1,
    fund.returns["3M"] - 0.3,
    fund.returns["6M"] - 0.5,
    fund.returns["1Y"] - 0.7,
    fund.returns["3Y"] - 2.0,
    fund.returns["5Y"] - 3.5,
  ]

  // Create new chart
  window.returnsComparisonChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["1 Month", "3 Months", "6 Months", "1 Year", "3 Years", "5 Years"],
      datasets: [
        {
          label: fund.name,
          data: [
            fund.returns["1M"],
            fund.returns["3M"],
            fund.returns["6M"],
            fund.returns["1Y"],
            fund.returns["3Y"],
            fund.returns["5Y"],
          ],
          backgroundColor: "rgba(79, 70, 229, 0.7)",
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 1,
        },
        {
          label: "Category Average",
          data: categoryAvgData,
          backgroundColor: "rgba(16, 185, 129, 0.7)",
          borderColor: "rgba(16, 185, 129, 1)",
          borderWidth: 1,
        },
        {
          label: "Benchmark",
          data: benchmarkData,
          backgroundColor: "rgba(245, 158, 11, 0.7)",
          borderColor: "rgba(245, 158, 11, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Returns (%)",
          },
        },
      },
    },
  })

  // Populate returns table
  const returnsTableContent = document.getElementById("returnsTableContent")

  if (returnsTableContent) {
    returnsTableContent.innerHTML = ""

    const periods = ["1 Month", "3 Months", "6 Months", "1 Year", "3 Years", "5 Years"]
    const keys = ["1M", "3M", "6M", "1Y", "3Y", "5Y"]

    keys.forEach((key, index) => {
      const row = document.createElement("div")
      row.className = "returns-row"
      row.innerHTML = `
        <div>${periods[index]}</div>
        <div class="${fund.returns[key] >= 0 ? "positive" : "negative"}">${fund.returns[key]}%</div>
        <div class="${categoryAvgData[index] >= 0 ? "positive" : "negative"}">${categoryAvgData[index].toFixed(1)}%</div>
        <div class="${benchmarkData[index] >= 0 ? "positive" : "negative"}">${benchmarkData[index].toFixed(1)}%</div>
      `
      returnsTableContent.appendChild(row)
    })
  }
}

function createRiskReturnChart() {
  const ctx = document.getElementById("riskReturnChart")

  if (!ctx) return

  // Destroy existing chart if it exists
  if (window.riskReturnChart) {
    window.riskReturnChart.destroy()
  }

  // Create data for risk-return chart (simulated)
  const data = funds.map((fund) => ({
    x: fund.stdDev,
    y: fund.returns["3Y"] / 3, // Annualized 3Y return
    r: 10,
    label: fund.name,
  }))

  // Create new chart
  window.riskReturnChart = new Chart(ctx, {
    type: "bubble",
    data: {
      datasets: [
        {
          label: "Funds",
          data: data,
          backgroundColor: "rgba(79, 70, 229, 0.7)",
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: "Risk (Standard Deviation %)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Return (Annualized %)",
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) =>
              context.raw.label + " - Risk: " + context.raw.x + "%, Return: " + context.raw.y.toFixed(1) + "%",
          },
        },
      },
    },
  })
}

// Success Modal
function showSuccessModal(fund) {
  const modal = document.getElementById("successModal")
  if (!modal) return

  // Generate random transaction ID
  const transactionId = "TRX" + Math.floor(Math.random() * 1000000000)

  // Get current date and time
  const now = new Date()
  const dateOptions = { year: "numeric", month: "long", day: "numeric" }
  const timeOptions = { hour: "2-digit", minute: "2-digit" }
  const dateTimeStr = now.toLocaleDateString("en-IN", dateOptions) + ", " + now.toLocaleTimeString("en-IN", timeOptions)

  // Get investment amount
  const amount =
    document.getElementById("lumpSumAmount")?.value || document.getElementById("sipAmount")?.value || "10,000"

  // Populate modal
  document.getElementById("transactionId").textContent = transactionId
  document.getElementById("successFundName").textContent = fund.name
  document.getElementById("successAmount").textContent = "₹" + amount
  document.getElementById("transactionDate").textContent = dateTimeStr

  // Show modal
  modal.classList.add("active")

  // Close modal when clicking close button
  const closeBtn = document.getElementById("closeSuccessBtn")
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active")
    })
  }

  // View portfolio button
  const viewPortfolioBtn = document.getElementById("viewPortfolioBtn")
  if (viewPortfolioBtn) {
    viewPortfolioBtn.addEventListener("click", () => {
      modal.classList.remove("active")
      // Scroll to portfolio section
      document.querySelector(".portfolio-summary").scrollIntoView({ behavior: "smooth" })
    })
  }

  // Close modal when clicking outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
    }
  })
}

