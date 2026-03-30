async function loadRecipe() {
  const id = window.location.pathname.split("/").pop();

  const res = await fetch(`/api/recipes/${id}`);
  const recipe = await res.json();

  // --- Page & browser title ---
  const titleWords = recipe.title.split(" ");
  const mid = Math.ceil(titleWords.length / 2);
  const titleLine1 = titleWords.slice(0, mid).join(" ");
  const titleLine2 = titleWords.slice(mid).join(" ");

  document.title = `${recipe.title} - Culinary Atelier`;

  // --- Breadcrumb ---
  const breadcrumb = document.getElementById("breadcrumb-title");
  if (breadcrumb) breadcrumb.textContent = recipe.title;

  // --- Hero heading ---
  const heroHeading = document.getElementById("hero-title");
  if (heroHeading) {
    heroHeading.innerHTML = `${titleLine1} <br /><span class="text-primary">${titleLine2}</span>`;
  }

  // --- Hero image ---
  const heroImage = document.getElementById("hero-image");
  if (heroImage) {
    heroImage.src =
      recipe.images?.[0] ||
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800";
    heroImage.alt = recipe.title;
  }

  // --- Category badge ---
  const categoryEl = document.getElementById("category-badge");
  if (categoryEl) categoryEl.textContent = recipe.category;

  // --- Tags ---
  const tagsEl = document.getElementById("tags-container");
  if (tagsEl) {
    tagsEl.innerHTML = "";
    recipe.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className =
        "px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-[11px] font-bold uppercase tracking-widest";
      span.textContent = tag;
      tagsEl.appendChild(span);
    });
  }

  // --- Ingredients ---
  const ingredientsEl = document.getElementById("ingredients-list");
  if (ingredientsEl) {
    ingredientsEl.innerHTML = "";
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement("li");
      li.className = "flex justify-between items-baseline group";

      const amountUnit = [ingredient.amount, ingredient.unit]
        .filter(Boolean)
        .join(" ");

      li.innerHTML = `
                <span class="text-body-lg font-medium text-on-surface">${ingredient.name}</span>
                <span class="flex-grow border-b border-dotted border-outline-variant/30 mx-4"></span>
                <span class="text-on-surface-variant font-label text-sm italic">${amountUnit}</span>
            `;
      ingredientsEl.appendChild(li);
    });
  }

  // --- Cooking steps ---
  const stepsEl = document.getElementById("steps-container");
  if (stepsEl) {
    stepsEl.innerHTML = "";
    recipe.steps.forEach((step, index) => {
      const num = String(index + 1).padStart(2, "0");

      // Use first sentence as a short title, rest as body
      const sentenceBreak = step.indexOf(". ");
      const hasTitle = sentenceBreak !== -1 && sentenceBreak < 60;
      const stepTitle = hasTitle ? step.slice(0, sentenceBreak) : `Step ${num}`;
      const stepBody = hasTitle ? step.slice(sentenceBreak + 2) : step;

      const div = document.createElement("div");
      div.className = "flex gap-8 group";
      div.innerHTML = `
                <span class="text-4xl font-extrabold text-outline-variant/20 transition-colors group-hover:text-primary/20 shrink-0 tabular-nums">${num}</span>
                <div class="pt-2">
                    <h3 class="text-lg font-bold text-on-surface mb-3 uppercase tracking-wider">${stepTitle}</h3>
                    <p class="text-on-surface-variant text-body-lg leading-relaxed">${stepBody}</p>
                </div>
            `;
      stepsEl.appendChild(div);
    });
  }
}

document.addEventListener("DOMContentLoaded", loadRecipe);
