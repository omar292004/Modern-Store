// --- Save user ---
function saveUser(username, email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
}

// --- Login check ---
function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.find(u => u.username === username && u.password === password);
}

// --- Send Reset Code with EmailJS ---
function sendResetCode(email) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  localStorage.setItem("resetCode", code);
  localStorage.setItem("resetEmail", email);

  // Send Email
  emailjs.send("service_6hf1npt", "template_8n8df7s", {
    to_email: email,
    code: code
  })
  .then(() => {
    alert("✅ Code sent successfully to " + email);
  })
  .catch(error => {
    console.error("❌ Failed to send code:", error);
    alert("Something went wrong while sending the email. Check console for details.");
  });
}

// --- Verify the code ---
function verifyCode(inputCode) {
  return inputCode === localStorage.getItem("resetCode");
}

// --- Change Password ---
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
  alert("Password changed successfully!");
}

// --- Product Filter ---
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

// --- Account Button Management ---
function handleLogin() {
  localStorage.setItem("isLoggedIn", "true");
  showAccountButton();
}

function handleLogout() {
  localStorage.removeItem("isLoggedIn");
  hideAccountButton();
}

function showAccountButton() {
  const btn = document.getElementById("account-btn");
  if (btn) btn.style.display = "block";
}

function hideAccountButton() {
  const btn = document.getElementById("account-btn");
  if (btn) btn.style.display = "none";
}

window.onload = function () {
  if (localStorage.getItem("isLoggedIn") === "true") {
    showAccountButton();
  } else {
    hideAccountButton();
  }
};
