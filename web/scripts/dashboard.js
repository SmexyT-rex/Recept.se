const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");
const mobileDrawer = document.getElementById("mobile-drawer");
const overlay = document.getElementById("drawer-overlay");

const toggleMenu = (isOpen) => {
  if (isOpen) {
    mobileDrawer.classList.add("open");
    overlay.classList.add("opacity-100");
    overlay.classList.remove("pointer-events-none");
    document.body.classList.add("overflow-hidden");
  } else {
    mobileDrawer.classList.remove("open");
    overlay.classList.remove("opacity-100");
    overlay.classList.add("pointer-events-none");
    document.body.classList.remove("overflow-hidden");
  }
};

menuOpen.addEventListener("click", () => toggleMenu(true));
menuClose.addEventListener("click", () => toggleMenu(false));
overlay.addEventListener("click", () => toggleMenu(false));
