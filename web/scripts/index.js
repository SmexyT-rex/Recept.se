const openBtn = document.getElementById("openMenuBtn");
const navBtn = document.getElementById("navButton");
const menu = document.getElementById("mobileMenu");
const cardContainer = document.getElementById("card-container");

openBtn.addEventListener("click", () => {
  menu.classList.add("open");
});

navBtn.addEventListener("click", () => {
  menu.classList.remove("open");
});

function displayRecipes(recipes) {
  cardContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    console.log(recipe.id);

    card.innerHTML = `
<a href="/recipe/${recipe._id}" class="recipe-card">
  <img
    src="https://images.unsplash.com/photo-1591632288574-a387f820a1ca?q=80&w=400&auto=format&fit=crop"
    alt="${recipe.title}"
    class="recipe-img"
  />

  <div class="recipe-content">
    <span class="tag">${recipe.category}</span>
    <h3>${recipe.title}</h3>
  </div>

  <span class="view-recipe-btn">
    <i class="bi bi-eye-fill"></i>
  </span>
</a>
    `;

    cardContainer.appendChild(card);
  });
}

async function fetchRecipes() {
  try {
    const response = await fetch("/api/recipes");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const recipes = await response.json();
    displayRecipes(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchRecipes);
