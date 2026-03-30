const heading = document.getElementById("profile-heading");
const userName = document.getElementById("user-name");
const userGrid = document.getElementById("user-recipes-grid");
const favoritesGrid = document.getElementById("favorites-grid");
const recipesPublishedCount = document.getElementById("recipes-published");

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
  userName.textContent = user.username;
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
  recipesPublishedCount.textContent = recipes.length;
  userGrid.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className =
      "bg-surface-container-low rounded-xl overflow-hidden flex flex-col group transition-all duration-300 hover:editorial-shadow";

    card.innerHTML = `<div
                class="bg-surface-container-low rounded-xl overflow-hidden flex flex-col group transition-all duration-300 hover:editorial-shadow"
              >
                <div class="relative h-64 overflow-hidden">
                  <img
                    alt="${recipe.title}"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="${recipe.images?.[0] || "https://media.gettyimages.com/id/1202073264/video/hungry-woman-waiting-to-be-served.jpg?s=640x640&k=20&c=oMs9rn7hpcd1uzVDv0nJhoKpi2XjyH9zWKboJuNOg34="}"
                  />
                  <div
                    class="absolute top-4 left-4 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  >
                    ${recipe.tags?.[0] || "Fresh"}
                  </div>
                </div>
                <div class="p-8 flex flex-col flex-1">
                  <div class="flex justify-between items-start mb-4">
                    <h3
                      class="text-2xl font-headline font-bold leading-tight group-hover:text-primary transition-colors"
                    >
                      ${recipe.title}
                    </h3>
                    <div class="flex gap-2">
                      <button
                        class="p-2 text-stone-400 hover:text-primary transition-colors"
                      >
                        <span class="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        class="bin-button p-2 text-stone-400 hover:text-error transition-colors"
                      >
                        <span class="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                  <p class="text-on-surface-variant line-clamp-2 mb-6">
                    ${recipe.description || "No description available."}
                  </p>
                  <div
                    class="mt-auto pt-6 border-t border-outline-variant/10 flex items-center gap-6"
                  >
                    <div class="flex items-center gap-2 text-stone-500">
                      <span class="material-symbols-outlined text-sm"
                        >schedule</span
                      >
                      <span class="text-sm font-semibold">60 mins</span>
                    </div>
                    <div class="flex items-center gap-2 text-stone-500">
                      <span class="material-symbols-outlined text-sm"
                        >restaurant</span
                      >
                      <span class="text-sm font-semibold capitalize">${recipe.tags?.[1] || "Fresh"}</span>
                    </div>
                  </div>
                </div>
              </div>`;

    userGrid.appendChild(card);
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
