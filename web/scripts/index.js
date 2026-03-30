gsap.registerPlugin(ScrollTrigger);

const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");
const drawer = document.getElementById("mobile-drawer");
const overlay = document.getElementById("drawer-overlay");
const logInButtons = document.querySelectorAll(".log-in");

const featuredRecipeImage = document.getElementById("featured-recipe-image");
const featuredRecipeTitle = document.getElementById("featured-recipe-title");

const secondRecipeImage = document.getElementById("second-recipe-image");
const secondRecipeTitle = document.getElementById("second-recipe-title");
const secondRecipeDescription = document.getElementById(
  "second-recipe-description",
);

const thirdRecipeImage = document.getElementById("third-recipe-image");
const thirdRecipeTitle = document.getElementById("third-recipe-title");
const thirdRecipeDescription = document.getElementById(
  "third-recipe-description",
);

const fourthRecipeImage = document.getElementById("fourth-recipe-image");
const fourthRecipeTitle = document.getElementById("fourth-recipe-title");
const fourthRecipeDescription = document.getElementById(
  "fourth-recipe-description",
);

function toggleMenu(isOpen) {
  if (isOpen) {
    drawer.classList.remove("translate-x-full");
    drawer.classList.add("translate-x-0");
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100", "pointer-events-auto");
    document.body.style.overflow = "hidden";
  } else {
    drawer.classList.add("translate-x-full");
    drawer.classList.remove("translate-x-0");
    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.classList.remove("opacity-100", "pointer-events-auto");
    document.body.style.overflow = "";
  }
}

menuOpen.addEventListener("click", () => toggleMenu(true));
menuClose.addEventListener("click", () => toggleMenu(false));
overlay.addEventListener("click", () => toggleMenu(false));

const heroTl = gsap.timeline({
  defaults: { ease: "power3.out", duration: 1.2 },
});
heroTl
  .from("section.relative h1", { y: 60, opacity: 0, delay: 0.2 })
  .from("section.relative p", { y: 30, opacity: 0 }, "-=0.8")
  .from("section.relative .flex.flex-wrap", { y: 20, opacity: 0 }, "-=0.6")
  .from(
    "section.relative .lg\\:col-span-5",
    { scale: 0.95, opacity: 0, duration: 1.5 },
    "0",
  );

if (window.innerWidth >= 1024) {
  gsap.to("section.relative .lg\\:col-span-5", {
    y: -50,
    ease: "none",
    scrollTrigger: {
      trigger: "section.relative",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

gsap.from(".grid.grid-cols-2.md\\:grid-cols-4.lg\\:grid-cols-5 > div", {
  scrollTrigger: {
    trigger: ".grid.grid-cols-2.md\\:grid-cols-4.lg\\:grid-cols-5",
    start: "top 85%",
  },
  opacity: 0,
  scale: 0.9,
  y: 40,
  duration: 0.8,
  stagger: 0.1,
  ease: "back.out(1.7)",
});

gsap.from(".space-y-24 > div:first-child, .space-y-32 > div:first-child", {
  scrollTrigger: {
    trigger: ".space-y-24 > div:first-child, .space-y-32 > div:first-child",
    start: "top 80%",
  },
  x: window.innerWidth >= 1024 ? -100 : 0,
  y: window.innerWidth < 1024 ? 50 : 0,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out",
});

gsap.from(
  "section.py-24.bg-stone-100\\/30 .grid > div, section.py-32.bg-stone-100\\/30 .grid > div",
  {
    scrollTrigger: {
      trigger:
        "section.py-24.bg-stone-100\\/30, section.py-32.bg-stone-100\\/30",
      start: "top 85%",
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out",
  },
);

gsap.from("section.py-24 .bg-primary, section.py-48 .bg-primary", {
  scrollTrigger: {
    trigger: "section.py-24 .bg-primary, section.py-48 .bg-primary",
    start: "top 85%",
  },
  scale: 0.95,
  opacity: 0,
  duration: 1,
  ease: "expo.out",
});

function displayRecipes(recipes) {
  featuredRecipeImage.src = "";
  featuredRecipeTitle.textContent = "";
  secondRecipeImage.src = "";
  secondRecipeTitle.textContent = "";
  secondRecipeDescription.textContent = "";
  thirdRecipeImage.src = "";
  thirdRecipeTitle.textContent = "";
  thirdRecipeDescription.textContent = "";

  const firstRecipe = recipes?.[0];
  if (firstRecipe) {
    featuredRecipeImage.src = firstRecipe.images?.[0] || "";
    featuredRecipeTitle.textContent = firstRecipe.title || "";
  }

  const secondRecipe = recipes?.[1];
  if (secondRecipe) {
    secondRecipeImage.src = secondRecipe.images?.[0] || "";
    secondRecipeTitle.textContent = secondRecipe.title || "";
    secondRecipeDescription.textContent =
      secondRecipe.description || "No description available.";
  }

  const thirdRecipe = recipes?.[2];

  if (thirdRecipe) {
    thirdRecipeImage.src = thirdRecipe.images?.[0] || "";
    thirdRecipeTitle.textContent = thirdRecipe.title || "";
    thirdRecipeDescription.textContent =
      thirdRecipe.description || "No description available.";
  }

  const fourthRecipe = recipes?.[3];

  if (fourthRecipe) {
    fourthRecipeImage.src = fourthRecipe.images?.[0] || "";
    fourthRecipeTitle.textContent = fourthRecipe.title || "";
    fourthRecipeDescription.textContent =
      fourthRecipe.description || "No description available.";
  }
}

async function fetchRecipes() {
  try {
    const response = await fetch("/api/recipes/");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const recipes = await response.json();
    displayRecipes(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

logInButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "/login";
  });
});

document.addEventListener("DOMContentLoaded", fetchRecipes);
