// DOM Elements
const navToggle = document.getElementById("navToggle")
const navMenu = document.getElementById("navMenu")
const tabButtons = document.querySelectorAll(".tab-button")
const calculators = document.querySelectorAll(".calculator")
const bankTabButtons = document.querySelectorAll("[data-bank-tab]")
const bankRates = document.querySelectorAll(".bank-rates")
const backToTopButton = document.getElementById("backToTop")

// FD Calculator Elements
const fdAmountInput = document.getElementById("fd-amount")
const fdAmountSlider = document.getElementById("fd-amount-slider")
const fdPeriodInput = document.getElementById("fd-period")
const fdPeriodSlider = document.getElementById("fd-period-slider")
const fdRateInput = document.getElementById("fd-rate")
const fdRateSlider = document.getElementById("fd-rate-slider")
const fdYearsButton = document.getElementById("fd-years")
const fdMonthsButton = document.getElementById("fd-months")
const fdCalculateButton = document.getElementById("fd-calculate-btn")
const fdInvestedValue = document.getElementById("fd-invested")
const fdInterestValue = document.getElementById("fd-interest")
const fdMaturityValue = document.getElementById("fd-maturity")

// RD Calculator Elements
const rdAmountInput = document.getElementById("rd-amount")
const rdAmountSlider = document.getElementById("rd-amount-slider")
const rdPeriodInput = document.getElementById("rd-period")
const rdPeriodSlider = document.getElementById("rd-period-slider")
const rdRateInput = document.getElementById("rd-rate")
const rdRateSlider = document.getElementById("rd-rate-slider")
const rdYearsButton = document.getElementById("rd-years")
const rdMonthsButton = document.getElementById("rd-months")
const rdCalculateButton = document.getElementById("rd-calculate-btn")
const rdInvestedValue = document.getElementById("rd-invested")
const rdInterestValue = document.getElementById("rd-interest")
const rdMaturityValue = document.getElementById("rd-maturity")

// Mobile Navigation Toggle
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Toggle hamburger to X
    const spans = navToggle.querySelectorAll("span")
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.click()
    }
  })

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navToggle.click()
      }
    })
  })
}

// Tab Switching
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab")

    // Update active tab button
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Show active calculator
    calculators.forEach((calc) => calc.classList.remove("active"))
    document.getElementById(`${tabId}-calculator`).classList.add("active")
  })
})

// Bank Rates Tab Switching
if (bankTabButtons.length > 0) {
  bankTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-bank-tab")

      // Update active tab button
      bankTabButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Show active bank rates
      bankRates.forEach((rate) => rate.classList.remove("active"))
      document.getElementById(tabId).classList.add("active")
    })
  })
}

// Back to Top Button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible")
  } else {
    backToTopButton.classList.remove("visible")
  }
})

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Sync input and slider values
function syncInputAndSlider(input, slider) {
  input.addEventListener("input", () => {
    slider.value = input.value
  })

  slider.addEventListener("input", () => {
    input.value = slider.value
  })
}

// Toggle buttons functionality
function setupToggleButtons(yearsButton, monthsButton, periodInput, periodSlider) {
  yearsButton.addEventListener("click", () => {
    yearsButton.classList.add("active")
    monthsButton.classList.remove("active")

    // Convert months to years if needed
    if (monthsButton.classList.contains("active-unit")) {
      periodInput.value = (Number.parseFloat(periodInput.value) / 12).toFixed(2)
      periodSlider.value = periodInput.value

      // Update min/max/step for years
      periodInput.min = 0.25
      periodInput.max = 10
      periodInput.step = 0.25
      periodSlider.min = 0.25
      periodSlider.max = 10
      periodSlider.step = 0.25
    }

    yearsButton.classList.add("active-unit")
    monthsButton.classList.remove("active-unit")
  })

  monthsButton.addEventListener("click", () => {
    monthsButton.classList.add("active")
    yearsButton.classList.remove("active")

    // Convert years to months if needed
    if (yearsButton.classList.contains("active-unit")) {
      periodInput.value = Math.round(Number.parseFloat(periodInput.value) * 12)
      periodSlider.value = periodInput.value

      // Update min/max/step for months
      periodInput.min = 1
      periodInput.max = 120
      periodInput.step = 1
      periodSlider.min = 1
      periodSlider.max = 120
      periodSlider.step = 1
    }

    monthsButton.classList.add("active-unit")
    yearsButton.classList.remove("active-unit")
  })

  // Set initial state
  yearsButton.classList.add("active-unit")
}

// Format currency
function formatCurrency(amount) {
  return "₹" + amount.toLocaleString("en-IN")
}

// Calculate FD returns
function calculateFD() {
  const principal = Number.parseFloat(fdAmountInput.value)
  let period = Number.parseFloat(fdPeriodInput.value)
  const rate = Number.parseFloat(fdRateInput.value)

  // Convert period to years if in months
  if (fdMonthsButton.classList.contains("active-unit")) {
    period = period / 12
  }

  // Calculate interest and maturity value
  const interest = (principal * rate * period) / 100
  const maturity = principal + interest

  // Update result values with animation
  animateValue(fdInvestedValue, principal)
  animateValue(fdInterestValue, interest)
  animateValue(fdMaturityValue, maturity)
}

// Calculate RD returns
function calculateRD() {
  const monthlyInvestment = Number.parseFloat(rdAmountInput.value)
  const period = Number.parseFloat(rdPeriodInput.value)
  const rate = Number.parseFloat(rdRateInput.value)

  // Convert period to months
  let months = period
  if (rdYearsButton.classList.contains("active-unit")) {
    months = period * 12
  }

  // Calculate total investment
  const totalInvestment = monthlyInvestment * months

  // Calculate maturity value using RD formula
  const monthlyRate = rate / 100 / 12
  let maturityValue = 0

  for (let i = 1; i <= months; i++) {
    maturityValue += monthlyInvestment * (1 + monthlyRate) ** (months - i + 1)
  }

  const interestEarned = maturityValue - totalInvestment

  // Update result values with animation
  animateValue(rdInvestedValue, totalInvestment)
  animateValue(rdInterestValue, interestEarned)
  animateValue(rdMaturityValue, maturityValue)
}

// Animate value change
function animateValue(element, targetValue) {
  const startValue = Number.parseInt(element.textContent.replace(/[^\d]/g, "")) || 0
  const duration = 1000 // 1 second
  const startTime = performance.now()

  function updateValue(currentTime) {
    const elapsedTime = currentTime - startTime
    const progress = Math.min(elapsedTime / duration, 1)

    // Easing function for smoother animation
    const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

    const currentValue = startValue + (targetValue - startValue) * easedProgress
    element.textContent = formatCurrency(Math.round(currentValue))

    if (progress < 1) {
      requestAnimationFrame(updateValue)
    }
  }

  requestAnimationFrame(updateValue)
}

// Initialize the calculators
function initCalculators() {
  // Set up FD calculator
  syncInputAndSlider(fdAmountInput, fdAmountSlider)
  syncInputAndSlider(fdPeriodInput, fdPeriodSlider)
  syncInputAndSlider(fdRateInput, fdRateSlider)
  setupToggleButtons(fdYearsButton, fdMonthsButton, fdPeriodInput, fdPeriodSlider)
  fdCalculateButton.addEventListener("click", calculateFD)

  // Set up RD calculator
  syncInputAndSlider(rdAmountInput, rdAmountSlider)
  syncInputAndSlider(rdPeriodInput, rdPeriodSlider)
  syncInputAndSlider(rdRateInput, rdRateSlider)
  setupToggleButtons(rdYearsButton, rdMonthsButton, rdPeriodInput, rdPeriodSlider)
  rdCalculateButton.addEventListener("click", calculateRD)

  // Calculate initial values
  calculateFD()
  calculateRD()
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initCalculators()

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
})

