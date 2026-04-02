const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }),
  });

  if (res.ok) {
    window.location.href = "/dashboard";
  } else {
    const data = await res.json().catch(() => null);
    const errorMsg = data?.error || "An error occurred. Please try again.";
    alert(errorMsg);
  }
});

const passwordInput = document.getElementById("password");
const toggleButton = passwordInput.nextElementSibling;

toggleButton.addEventListener("click", () => {
  console.log("Triggered");
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";

  const icon = toggleButton.querySelector(".material-symbols-outlined");
  icon.textContent = isHidden ? "visibility_off" : "visibility";
});
