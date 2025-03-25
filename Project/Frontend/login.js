// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initPage();
    setupFormToggle();
    setupPasswordToggle();
    setupFormValidation();
    addRippleEffect();
});

// Initialize page
function initPage() {
    window.addEventListener("load", () => {
        const loader = document.getElementById("pageLoader");
        if (loader) {
            setTimeout(() => {
                loader.classList.add("hidden");
                document.body.classList.add("loaded");
            }, 800);
        }
    });
}

// Setup form toggle
function setupFormToggle() {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    if (container && registerBtn && loginBtn) {
        registerBtn.addEventListener("click", () => {
            container.classList.add("right-panel-active");
            animateFormElements(".sign-up form > *");
        });

        loginBtn.addEventListener("click", () => {
            container.classList.remove("right-panel-active");
            animateFormElements(".sign-in form > *");
        });
    }

    if (window.innerWidth <= 768) createMobileNavigation();
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 768 && !document.querySelector(".mobile-nav")) {
            createMobileNavigation();
        } else {
            const mobileNav = document.querySelector(".mobile-nav");
            if (mobileNav) mobileNav.remove();
        }
    });
}

// Create mobile navigation for small screens
function createMobileNavigation() {
    if (document.querySelector(".mobile-nav")) return;

    const container = document.getElementById("container");
    const mobileNav = document.createElement("div");
    mobileNav.className = "mobile-nav";

    const signInBtn = document.createElement("button");
    signInBtn.className = "mobile-nav-button active";
    signInBtn.textContent = "Sign In";
    signInBtn.addEventListener("click", function () {
        container.classList.remove("right-panel-active");
        this.classList.add("active");
        signUpBtn.classList.remove("active");
        animateFormElements(".sign-in form > *");
    });

    const signUpBtn = document.createElement("button");
    signUpBtn.className = "mobile-nav-button";
    signUpBtn.textContent = "Sign Up";
    signUpBtn.addEventListener("click", function () {
        container.classList.add("right-panel-active");
        this.classList.add("active");
        signInBtn.classList.remove("active");
        animateFormElements(".sign-up form > *");
    });

    mobileNav.appendChild(signInBtn);
    mobileNav.appendChild(signUpBtn);
    container.prepend(mobileNav);
}

// Animate form elements
function animateFormElements(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        element.style.animation = "none";
        element.offsetHeight;
        element.style.animation = `fadeIn 0.5s ease forwards, slideInUp 0.5s ease forwards ${index * 0.1}s`;
    });
}

// Setup password visibility toggle
function setupPasswordToggle() {
    const togglePassword = (toggleIcon, passwordInput) => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.classList.replace("fa-eye", "fa-eye-slash");
        } else {
            passwordInput.type = "password";
            toggleIcon.classList.replace("fa-eye-slash", "fa-eye");
        }
    };

    const signupPasswordToggle = document.getElementById("signupPasswordToggle");
    const signinPasswordToggle = document.getElementById("signinPasswordToggle");
    const signupPassword = document.getElementById("signupPassword");
    const signinPassword = document.getElementById("signinPassword");

    if (signupPasswordToggle && signupPassword) {
        signupPasswordToggle.addEventListener("click", () => {
            togglePassword(signupPasswordToggle, signupPassword);
        });
    }

    if (signinPasswordToggle && signinPassword) {
        signinPasswordToggle.addEventListener("click", () => {
            togglePassword(signinPasswordToggle, signinPassword);
        });
    }
}

// Setup form validation and API requests
function setupFormValidation() {
    const signupForm = document.getElementById("signupForm");
    const signinForm = document.getElementById("signinForm");

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("signupName").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
            const terms = document.getElementById("terms").checked;

            if (!name || !email || !password || !terms) {
                showError("Please fill in all fields and accept the terms.");
                return;
            }

            if (password.length < 8) {
                showError("Password must be at least 8 characters long.");
                return;
            }

            if (!validateEmail(email)) {
                showError("Please enter a valid email address.");
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                });

                const data = await res.json();
                if (res.ok) {
                    showSuccessMessage("Account Created!", "Your account has been created successfully.", "Sign In");
                } else {
                    showError(data.msg);
                }
            } catch (err) {
                showError("Something went wrong! Try again later.");
            }
        });
    }

    if (signinForm) {
        signinForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("signinEmail").value;
            const password = document.getElementById("signinPassword").value;

            if (!email || !password) {
                showError("Please enter both email and password.");
                return;
            }

            if (!validateEmail(email)) {
                showError("Please enter a valid email address.");
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem("token", data.token);  // Store JWT token
                    localStorage.setItem("userName", data.name);  // Store user's name

                    showSuccessMessage("Welcome Back!", `Hello, ${data.name}!`, "Continue to App");

                    setTimeout(() => {
                        window.location.href = "app.html";  // Redirect to app.html
                    }, 2000);
                } else {
                    showError(data.msg);
                }
            } catch (err) {
                showError("Something went wrong! Try again later.");
            }
        });
    }
}

// Validate email format
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Show error message
function showError(message) {
    alert(message);
}

// Show success message
function showSuccessMessage(title, message, buttonText) {
    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
        document.getElementById("successTitle").textContent = title;
        document.getElementById("successText").textContent = message;
        document.getElementById("successButton").textContent = buttonText;
        successMessage.classList.add("show");
        document.getElementById("successButton").addEventListener("click", () => {
            successMessage.classList.remove("show");
            if (buttonText.includes("App")) window.location.href = "app.html";
        });
    }
}
if (signinForm) {
    signinForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("signinEmail").value;
        const password = document.getElementById("signinPassword").value;

        if (!email || !password) {
            showError("Please enter both email and password.");
            return;
        }

        if (!validateEmail(email)) {
            showError("Please enter a valid email address.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);   // Store JWT token
                localStorage.setItem("userName", data.name); // Store user's name

                showSuccessMessage("Welcome Back!", `Hello, ${data.name}!`, "Continue to App");

                setTimeout(() => {
                    window.location.href = "app.html";  // Redirect to app.html
                }, 2000);
            } else {
                showError(data.msg);
            }
        } catch (err) {
            showError("Something went wrong! Try again later.");
        }
    });
}
