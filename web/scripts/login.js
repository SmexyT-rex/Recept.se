const loginForm = document.getElementById("loginForm");

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
    window.location.href = "/profile";
  } else {
    const data = await res.json().catch(() => null);
    const errorMsg = data?.error || "An error occurred. Please try again.";
    alert(errorMsg);
  }
});
