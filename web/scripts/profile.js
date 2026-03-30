document.addEventListener("DOMContentLoaded", () => {
  const menuOpen = document.getElementById("menu-open");
  const menuClose = document.getElementById("menu-close");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("drawer-overlay");

  const userName = document.getElementById("user-name");
  const userGrid = document.getElementById("user-recipes-grid");
  const likesGrid = document.getElementById("likes-grid");
  const recipesPublishedCount = document.getElementById("recipes-published");

  let selectedRecipeId = null;
  let selectedCard = null;
  let selectedType = null;

  const toggleMenu = (open) => {
    if (!mobileDrawer || !overlay) return;

    mobileDrawer.classList.toggle("open", open);
    overlay.classList.toggle("opacity-100", open);
    overlay.classList.toggle("pointer-events-none", !open);
    document.body.classList.toggle("overflow-hidden", open);
  };

  menuOpen?.addEventListener("click", () => toggleMenu(true));
  menuClose?.addEventListener("click", () => toggleMenu(false));
  overlay?.addEventListener("click", () => toggleMenu(false));

  const openModal = () => {
    const modal = document.getElementById("delete-modal");
    if (!modal) return;
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    const modal = document.getElementById("delete-modal");
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  document.addEventListener("click", async (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const deleteBtn = target.closest(".bin-button");
    if (deleteBtn) {
      const card = deleteBtn.closest(".user-recipes");
      if (!card) return;

      const id = card.dataset.id;
      const type = card.dataset.type;

      if (!id || !type) return;

      selectedRecipeId = id;
      selectedCard = card;
      selectedType = type;

      openModal();
      return;
    }

    if (target.closest("#confirm-delete-button")) {
      if (!selectedRecipeId || !selectedCard || !selectedType) return;

      try {
        if (selectedType === "own") {
          await fetch(`/api/recipes/${selectedRecipeId}`, {
            method: "DELETE",
            credentials: "include",
          });

          const count = Number(recipesPublishedCount.textContent || 0);
          recipesPublishedCount.textContent = Math.max(0, count - 1);
        }

        if (selectedType === "liked") {
          await fetch(`/api/likes/${selectedRecipeId}`, {
            method: "DELETE",
            credentials: "include",
          });
        }

        selectedCard.remove();
        closeModal();

        selectedRecipeId = null;
        selectedCard = null;
        selectedType = null;
      } catch (err) {
        console.error(err);
      }

      return;
    }

    if (target.closest("#close-modal") || target.id === "modal-backdrop") {
      closeModal();
    }
  });

  async function fetchUser() {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (!res.ok) throw new Error("Not authenticated");
    return res.json();
  }

  async function fetchRecipeDetails(ids) {
    const res = await fetch("/recipes", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });

    if (!res.ok) throw new Error("Failed to fetch recipes");
    return res.json();
  }

  async function loadUserRecipes(userId) {
    const res = await fetch(`/api/users/recipes/${userId}`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch user recipes");

    const data = await res.json();
    return fetchRecipeDetails(data.map((r) => r.recipe_id));
  }

  async function loadLikedRecipes(userId) {
    const res = await fetch(`/api/likes/${userId}`, {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to fetch liked recipes");

    const data = await res.json();
    return fetchRecipeDetails(data.map((r) => r.recipe_id));
  }

  function createCard(recipe, type) {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
      <div class="user-recipes bg-surface-container-low rounded-xl overflow-hidden flex flex-col group"
           data-id="${recipe.id}"
           data-type="${type}">
        <div class="relative h-64 overflow-hidden">
          <img src="${recipe.images?.[0] || ""}" class="w-full h-full object-cover" />
        </div>

        <div class="p-8 flex flex-col flex-1">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold">${recipe.title}</h3>
            <button class="bin-button p-2">
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>

          <p>${recipe.description || "No description available."}</p>
        </div>
      </div>
    `;

    return wrapper.firstElementChild;
  }

  function renderRecipes(recipes) {
    if (!userGrid) return;
    userGrid.innerHTML = "";
    recipesPublishedCount.textContent = recipes.length;

    recipes.forEach((r) => {
      userGrid.appendChild(createCard(r, "own"));
    });
  }

  function renderLikedRecipes(recipes) {
    if (!likesGrid) return;
    likesGrid.innerHTML = "";

    recipes.forEach((r) => {
      likesGrid.appendChild(createCard(r, "liked"));
    });
  }

  async function init() {
    try {
      const user = await fetchUser();

      if (userName) userName.textContent = user.username;

      const [own, liked] = await Promise.all([
        loadUserRecipes(user.id),
        loadLikedRecipes(user.id),
      ]);

      renderRecipes(own);
      renderLikedRecipes(liked);
    } catch (err) {
      console.error(err);
    }
  }

  init();
});
