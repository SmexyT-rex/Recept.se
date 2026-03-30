const passwordInput = document.getElementById("password");
const toggleButton = passwordInput.nextElementSibling;

toggleButton.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";

  const icon = toggleButton.querySelector(".material-symbols-outlined");
  icon.textContent = isHidden ? "visibility_off" : "visibility";
});
