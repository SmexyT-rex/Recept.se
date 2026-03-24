const openBtn = document.getElementById("openMenuBtn");
const navBtn = document.getElementById("navButton");
const menu = document.getElementById("mobileMenu");

openBtn.addEventListener("click", () => {
  menu.classList.add("open");
});

navBtn.addEventListener("click", () => {
  menu.classList.remove("open");
});
