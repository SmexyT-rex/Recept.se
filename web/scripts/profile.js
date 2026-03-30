const heading = document.getElementById("profile-heading");
const grid = document.getElementById("recipe-grid");

async function fetchUser() {
  const res = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
}

async function fetchRecipeDetails(recipeIds) {
  const res = await fetch("/recipes", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids: recipeIds }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
}

async function loadProfile(user) {
  heading.textContent = `Welcome, ${user.username}!`;
}

async function loadUserRecipes(user) {
  const res = await fetch(`/api/users/recipes/${user.id}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const userRecipes = await res.json();

  const recipeIds = userRecipes.map((r) => r.recipe_id);

  return fetchRecipeDetails(recipeIds);
}

function renderRecipes(recipes) {
  grid.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <a href="/recipes/${recipe._id}">
        <h3>${recipe.title}</h3>
      </a>
      <p>${recipe.category}</p>
    `;

    grid.appendChild(card);
  });
}

async function initProfile() {
  try {
    const user = await fetchUser();

    await loadProfile(user);

    const recipes = await loadUserRecipes(user);

    renderRecipes(recipes);
  } catch (err) {
    console.error(err);
  }
}

initProfile();
