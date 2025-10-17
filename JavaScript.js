
// Example for saving user signup data locally
function saveUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
}

// Example for login check
function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find(u => u.username === username && u.password === password);
}

// Example: password reset code
function sendResetCode(email) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("resetCode", code);
    localStorage.setItem("resetEmail", email);
    alert("Code sent to " + email + ": " + code); // replace with real email sending in production
}

function verifyCode(inputCode) {
    return inputCode === localStorage.getItem("resetCode");
}

function changePassword(newPass) {
    const email = localStorage.getItem("resetEmail");
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users = users.map(u => {
        if (u.email === email) {
            return { ...u, password: newPass };
        }
        return u;
    });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password changed successfully");
}
// Filter Products by Category
function filterProducts(category) {
    let products = document.querySelectorAll(".card");
    products.forEach(product => {
        if (category === "all" || product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Check if user is logged in
document.addEventListener("DOMContentLoaded", function () {
    let user = JSON.parse(localStorage.getItem("user"));
    let navButtons = document.getElementById("navButtons");

    if (user) {
        navButtons.innerHTML = `<a href="account.html" class="btn">Account</a>`;
    }
});
// لما المستخدم يعمل signup أو login بنخزن الحالة
function handleLogin() {
    localStorage.setItem("isLoggedIn", "true");
    showAccountButton();
}

// لما يعمل logout
function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    hideAccountButton();
}

// دوال للتحكم في الزرار
function showAccountButton() {
    document.getElementById("account-btn").style.display = "block";
}

function hideAccountButton() {
    document.getElementById("account-btn").style.display = "none";
}

// نتأكد أول ما الصفحة تفتح إذا كان المستخدم مسجل
window.onload = function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        showAccountButton();
    } else {
        hideAccountButton();
    }
};
function sendCode() {
  const email = document.getElementById("email").value;
  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code

  // Send via EmailJS
  emailjs.send("service_6hf1npt", "template_8n8df7s", {
      to_email: email,
      code: code
  })
  .then(() => {
      alert("Code sent successfully to " + email);
  })
  .catch(error => {
      console.error("Failed to send code:", error);
      alert("Something went wrong. Please try again.");
  });
}

