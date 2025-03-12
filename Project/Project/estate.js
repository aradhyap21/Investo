// Initialize AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS library
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
      mirror: true,
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Add active class to nav links on scroll
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("section")
      const navLinks = document.querySelectorAll(".nav-links a")
  
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 100) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active")
        }
      })
    })
  })
  
  // Pension Calculator Function
  function calculatePension() {
    const age = Number.parseInt(document.getElementById("age").value)
    const monthly = Number.parseFloat(document.getElementById("monthly").value)
    const returns = Number.parseFloat(document.getElementById("returns").value)
  
    if (!age || !monthly || !returns) {
      alert("Please fill all the fields")
      return
    }
  
    if (age < 18 || age > 65) {
      alert("Age should be between 18 and 65")
      return
    }
  
    // Calculate pension corpus
    const yearsToRetirement = 60 - age
    const monthlyRate = returns / (12 * 100)
    const months = yearsToRetirement * 12
  
    // Future Value calculation using compound interest formula
    const corpus = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
  
    // Calculate estimated monthly pension (assuming 4% annual withdrawal)
    const monthlyPension = (corpus * 0.04) / 12
  
    const resultDiv = document.getElementById("result")
    resultDiv.innerHTML = ` 
          <h3>Estimated Results at Age 60</h3>
          <p><strong>Total Corpus:</strong> ₹${Math.round(corpus).toLocaleString()}</p>
          <p><strong>Estimated Monthly Pension:</strong> ₹${Math.round(monthlyPension).toLocaleString()}</p>
          <p><strong>Annual Pension:</strong> ₹${Math.round(monthlyPension * 12).toLocaleString()}</p>
      `
  
    // Show result with animation
    resultDiv.style.display = "block"
    resultDiv.classList.add("animate__animated", "animate__fadeIn")
  
    // Scroll to result
    setTimeout(() => {
      resultDiv.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }, 300)
  }
  
  // Add input validation
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener("input", function () {
        if (this.value < 0) this.value = 0
      })
    })
  })
  
  // Payout Request Form Handling
  document.addEventListener("DOMContentLoaded", () => {
    const payoutForm = document.getElementById("payout-form")
    if (payoutForm) {
      payoutForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const amount = document.getElementById("payout-amount").value
        const type = document.getElementById("payout-type").value
        const frequency = document.getElementById("payout-frequency").value
        const method = document.getElementById("payment-method").value
  
        // Simulate form submission
        const resultDiv = document.getElementById("payout-result")
        resultDiv.innerHTML = `
                  <h3>Payout Request Submitted</h3>
                  <p>Your request for ₹${Number.parseInt(amount).toLocaleString()} has been submitted successfully.</p>
                  <p>Request ID: REQ-${Math.floor(Math.random() * 1000000)}</p>
                  <p>You will receive a confirmation email shortly.</p>
              `
        resultDiv.style.display = "block"
  
        // Add to withdrawal history
        addWithdrawalToHistory({
          date: new Date().toISOString().split("T")[0],
          type: type === "partial" ? "Partial Withdrawal" : "Regular Pension",
          amount: Number.parseInt(amount),
          status: "pending",
        })
  
        // Reset form
        setTimeout(() => {
          payoutForm.reset()
        }, 3000)
      })
    }
  
    // Handle payout type change
    const payoutType = document.getElementById("payout-type")
    const payoutFrequency = document.getElementById("payout-frequency")
    const payoutReason = document.getElementById("payout-reason")
  
    if (payoutType && payoutFrequency && payoutReason) {
      payoutType.addEventListener("change", function () {
        if (this.value === "partial") {
          payoutReason.parentElement.style.display = "block"
          payoutFrequency.parentElement.style.display = "none"
        } else if (this.value === "regular") {
          payoutReason.parentElement.style.display = "none"
          payoutFrequency.parentElement.style.display = "block"
        } else if (this.value === "lumpsum") {
          payoutReason.parentElement.style.display = "none"
          payoutFrequency.parentElement.style.display = "none"
        }
      })
  
      // Initialize
      payoutReason.parentElement.style.display = "none"
    }
  })
  
  // Complaint Form Handling
  document.addEventListener("DOMContentLoaded", () => {
    const complaintForm = document.getElementById("complaint-form")
    if (complaintForm) {
      complaintForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const type = document.getElementById("complaint-type").value
        const subject = document.getElementById("complaint-subject").value
  
        // Simulate form submission
        const resultDiv = document.getElementById("complaint-result")
        resultDiv.innerHTML = `
                  <h3>Complaint Submitted</h3>
                  <p>Your complaint regarding "${subject}" has been submitted successfully.</p>
                  <p>Complaint ID: COMP-${Math.floor(Math.random() * 1000000)}</p>
                  <p>We will get back to you within 48 hours.</p>
              `
        resultDiv.style.display = "block"
  
        // Reset form
        setTimeout(() => {
          complaintForm.reset()
        }, 3000)
      })
    }
  })
  
  // Withdrawal History
  const withdrawalHistory = [
    {
      id: "WD-123456",
      date: "2023-12-15",
      type: "Regular Pension",
      amount: 15000,
      status: "completed",
      details: {
        requestDate: "2023-12-10",
        processedDate: "2023-12-15",
        accountNumber: "XXXX1234",
        reference: "REF-987654",
      },
    },
    {
      id: "WD-123457",
      date: "2024-01-15",
      type: "Regular Pension",
      amount: 15000,
      status: "completed",
      details: {
        requestDate: "2024-01-10",
        processedDate: "2024-01-15",
        accountNumber: "XXXX1234",
        reference: "REF-987655",
      },
    },
    {
      id: "WD-123458",
      date: "2024-02-15",
      type: "Regular Pension",
      amount: 15000,
      status: "completed",
      details: {
        requestDate: "2024-02-10",
        processedDate: "2024-02-15",
        accountNumber: "XXXX1234",
        reference: "REF-987656",
      },
    },
    {
      id: "WD-123459",
      date: "2024-02-20",
      type: "Partial Withdrawal",
      amount: 50000,
      status: "completed",
      details: {
        requestDate: "2024-02-15",
        processedDate: "2024-02-20",
        reason: "Medical Emergency",
        accountNumber: "XXXX1234",
        reference: "REF-987657",
      },
    },
    {
      id: "WD-123460",
      date: "2024-03-15",
      type: "Regular Pension",
      amount: 15000,
      status: "processing",
      details: {
        requestDate: "2024-03-10",
        accountNumber: "XXXX1234",
      },
    },
  ]
  
  function populateWithdrawalHistory() {
    const tableBody = document.getElementById("withdrawal-history-body")
    if (!tableBody) return
  
    tableBody.innerHTML = ""
  
    withdrawalHistory.sort((a, b) => new Date(b.date) - new Date(a.date))
  
    withdrawalHistory.forEach((item) => {
      const row = document.createElement("tr")
  
      const statusClass = `status-${item.status}`
      const statusText = item.status.charAt(0).toUpperCase() + item.status.slice(1)
  
      row.innerHTML = `
              <td>${formatDate(item.date)}</td>
              <td>${item.type}</td>
              <td>₹${item.amount.toLocaleString()}</td>
              <td><span class="status-badge ${statusClass}">${statusText}</span></td>
              <td><button class="details-btn" data-id="${item.id}">View Details</button></td>
          `
  
      tableBody.appendChild(row)
    })
  
    // Add event listeners to detail buttons
    document.querySelectorAll(".details-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id")
        showWithdrawalDetails(id)
      })
    })
  
    updateWithdrawalSummary()
  }
  
  function addWithdrawalToHistory(withdrawal) {
    const newWithdrawal = {
      id: `WD-${Math.floor(Math.random() * 1000000)}`,
      ...withdrawal,
      details: {
        requestDate: new Date().toISOString().split("T")[0],
        accountNumber: "XXXX1234",
      },
    }
  
    withdrawalHistory.unshift(newWithdrawal)
    populateWithdrawalHistory()
  }
  
  function updateWithdrawalSummary() {
    const totalWithdrawn = withdrawalHistory
      .filter((item) => item.status === "completed")
      .reduce((sum, item) => sum + item.amount, 0)
  
    const pendingCount = withdrawalHistory.filter(
      (item) => item.status === "pending" || item.status === "processing",
    ).length
  
    document.getElementById("total-withdrawn").textContent = totalWithdrawn.toLocaleString()
    document.getElementById("pending-count").textContent = pendingCount
  }
  
  function showWithdrawalDetails(id) {
    const withdrawal = withdrawalHistory.find((item) => item.id === id)
    if (!withdrawal) return
  
    // Create modal
    const modalOverlay = document.createElement("div")
    modalOverlay.className = "modal-overlay"
  
    const modalContent = `
          <div class="modal">
              <button class="modal-close">&times;</button>
              <h3 class="modal-title">Withdrawal Details</h3>
              <div class="modal-content">
                  <p><span class="label">ID:</span> ${withdrawal.id}</p>
                  <p><span class="label">Type:</span> ${withdrawal.type}</p>
                  <p><span class="label">Amount:</span> ₹${withdrawal.amount.toLocaleString()}</p>
                  <p><span class="label">Status:</span> ${withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}</p>
                  <p><span class="label">Request Date:</span> ${formatDate(withdrawal.details.requestDate)}</p>
                  ${withdrawal.details.processedDate ? `<p><span class="label">Processed Date:</span> ${formatDate(withdrawal.details.processedDate)}</p>` : ""}
                  ${withdrawal.details.reason ? `<p><span class="label">Reason:</span> ${withdrawal.details.reason}</p>` : ""}
                  <p><span class="label">Account Number:</span> ${withdrawal.details.accountNumber}</p>
                  ${withdrawal.details.reference ? `<p><span class="label">Reference:</span> ${withdrawal.details.reference}</p>` : ""}
              </div>
              <div class="modal-actions">
                  <button class="btn modal-close-btn">Close</button>
              </div>
          </div>
      `
  
    modalOverlay.innerHTML = modalContent
    document.body.appendChild(modalOverlay)
  
    // Show modal with animation
    setTimeout(() => {
      modalOverlay.classList.add("active")
    }, 10)
  
    // Close modal events
    const closeModal = () => {
      modalOverlay.classList.remove("active")
      setTimeout(() => {
        document.body.removeChild(modalOverlay)
      }, 300)
    }
  
    modalOverlay.querySelector(".modal-close").addEventListener("click", closeModal)
    modalOverlay.querySelector(".modal-close-btn").addEventListener("click", closeModal)
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal()
      }
    })
  }
  
  function formatDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-IN", options)
  }
  
  // Initialize withdrawal history on page load
  document.addEventListener("DOMContentLoaded", () => {
    populateWithdrawalHistory()
  })
  
  // Page loader hide after everything is loaded
  window.addEventListener("load", () => {
    document.getElementById("page-loader").style.opacity = 0
    setTimeout(() => {
      document.getElementById("page-loader").style.display = "none"
    }, 500)
  
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
      mirror: false,
      offset: 120,
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
  
  // Mobile menu toggle
  document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.querySelector(".mobile-menu-btn")
    const mobileMenu = document.querySelector(".mobile-menu")
  
    if (menuBtn) {
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
  })
  
  // Calculate investment returns
  function calculateReturns() {
    const investment = Number.parseFloat(document.getElementById("investment").value)
    const years = Number.parseFloat(document.getElementById("years").value)
    const returnRate = Number.parseFloat(document.getElementById("return").value) / 100
    const dividendYield = Number.parseFloat(document.getElementById("dividend").value) / 100
  
    if (isNaN(investment) || isNaN(years) || isNaN(returnRate) || isNaN(dividendYield)) {
      document.getElementById("result").innerHTML = '<p class="error">Please enter valid numbers</p>'
      document.getElementById("result").style.display = "block"
      return
    }
  
    // Calculate future value with compound interest
    const futureValue = investment * Math.pow(1 + returnRate, years)
    const totalReturn = futureValue - investment
  
    // Calculate dividend income
    const annualDividend = investment * dividendYield
    const totalDividends = annualDividend * years
  
    // Calculate total return including dividends
    const totalReturnWithDividends = totalReturn + totalDividends
    const totalValueWithDividends = investment + totalReturnWithDividends
  
    const resultDiv = document.getElementById("result")
    resultDiv.innerHTML = `
          <h3>Projected Results After ${years} Years</h3>
          <div class="result-grid">
              <div class="result-item">
                  <p class="result-label">Initial Investment:</p>
                  <p class="result-value">$${investment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">Capital Appreciation:</p>
                  <p class="result-value">$${totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item">
                  <p class="result-label">Total Dividends:</p>
                  <p class="result-value">$${totalDividends.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item highlight">
                  <p class="result-label">Final Value:</p>
                  <p class="result-value">$${totalValueWithDividends.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div class="result-item highlight">
                  <p class="result-label">Total Return:</p>
                  <p class="result-value">${((totalReturnWithDividends / investment) * 100).toFixed(2)}%</p>
              </div>
          </div>
          <div class="result-note">
              <p>Note: This is a simplified calculation and does not account for taxes, inflation, or changing dividend yields.</p>
          </div>
      `
    resultDiv.style.display = "block"
  
    // Add animation class
    resultDiv.classList.add("animate__animated", "animate__fadeIn")
  }
  
  // Sample portfolio data
  const sampleProperties = [
    {
      id: "REIT001",
      name: "Cityview Office Tower",
      marketCap: 245.8,
      dividendYield: 4.2,
      performance: 3.5,
    },
    {
      id: "REIT002",
      name: "Westfield Shopping Mall",
      marketCap: 189.3,
      dividendYield: 5.1,
      performance: -1.2,
    },
    {
      id: "REIT003",
      name: "Lakeside Apartments",
      marketCap: 312.6,
      dividendYield: 3.8,
      performance: 2.7,
    },
    {
      id: "REIT004",
      name: "Industrial Park East",
      marketCap: 156.4,
      dividendYield: 4.5,
      performance: 4.8,
    },
    {
      id: "REIT005",
      name: "Healthcare Complex",
      marketCap: 203.9,
      dividendYield: 3.9,
      performance: 1.6,
    },
  ]
  
  // Load portfolio data
  function loadPortfolioData() {
    const tableBody = document.getElementById("portfolio-data")
    if (!tableBody) return
  
    // Clear existing data
    tableBody.innerHTML = ""
  
    // Randomize the data slightly to simulate market changes
    const properties = sampleProperties.map((property) => {
      const performanceChange = (Math.random() * 2 - 1) * 0.5
      const dividendChange = (Math.random() * 2 - 1) * 0.2
  
      return {
        ...property,
        performance: Number.parseFloat((property.performance + performanceChange).toFixed(1)),
        dividendYield: Number.parseFloat((property.dividendYield + dividendChange).toFixed(1)),
      }
    })
  
    // Add rows to table
    properties.forEach((property) => {
      const row = document.createElement("tr")
  
      const performanceClass = property.performance >= 0 ? "performance-up" : "performance-down"
      const performanceIcon = property.performance >= 0 ? "fa-arrow-up" : "fa-arrow-down"
  
      row.innerHTML = `
              <td>${property.id}</td>
              <td>${property.name}</td>
              <td>$${property.marketCap.toFixed(1)}M</td>
              <td>${property.dividendYield}%</td>
              <td>
                  <div class="performance-indicator ${performanceClass}">
                      <i class="fas ${performanceIcon}"></i>
                      ${Math.abs(property.performance)}%
                  </div>
              </td>
          `
  
      tableBody.appendChild(row)
    })
  
    // Update summary
    updatePortfolioSummary(properties)
  }
  
  // Update portfolio summary
  function updatePortfolioSummary(properties) {
    const totalProperties = properties.length
  
    const totalMarketValue = properties.reduce((sum, property) => sum + property.marketCap, 0)
  
    const avgDividend = properties.reduce((sum, property) => sum + property.dividendYield, 0) / totalProperties
  
    document.getElementById("total-properties").textContent = totalProperties
    document.getElementById("total-market-value").textContent = `$${totalMarketValue.toFixed(1)}M`
    document.getElementById("avg-dividend").textContent = `${avgDividend.toFixed(1)}%`
  }
  
  