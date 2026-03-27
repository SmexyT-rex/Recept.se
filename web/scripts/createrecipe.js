// Navbar & Menu
const openBtn = document.getElementById('openMenuBtn');
const navBtn = document.getElementById('navButton');
const menu = document.getElementById('mobileMenu');

openBtn.addEventListener('click', () => {
    menu.classList.add('open');
});

navBtn.addEventListener('click', () => {
    menu.classList.remove('open');
});

// Add new field for recipe
function addField(containerId, placeholder, isInput = false) {
    const container = document.getElementById(containerId);
    const wrapper = document.createElement('div');
    wrapper.classList.add('dynamic-item');

    if (containerId === 'stepsList') {
        wrapper.innerHTML = `
          <textarea name="steps[]" rows="3" placeholder="${placeholder}"></textarea>
          <button type="button" class="remove-btn" onclick="removeField(this)">Remove</button>
        `;
    } else {
        let fieldName = 'ingredients[]';

        if (containerId === 'imagesList') {
            fieldName = 'images[]';
        }

        wrapper.innerHTML = `
          <input type="text" name="${fieldName}" placeholder="${placeholder}" />
          <button type="button" class="remove-btn" onclick="removeField(this)">Remove</button>
        `;
    }

    container.appendChild(wrapper);
    updatePreview();
}

// Remove field for recipe
function removeField(button) {
    const item = button.parentElement;
    const container = item.parentElement;

    if (container.children.length > 1) {
        item.remove();
        updatePreview();
    }
}

// Add ingredient for recipe
function addIngredient() {
    const container = document.getElementById('ingredientsList');

    const wrapper = document.createElement('div');
    wrapper.classList.add('dynamic-item', 'ingredient-row');

    wrapper.innerHTML = `
    <input type="text" name="ingredient[]" placeholder="Ingredient" />
    <input type="number" name="amount[]" placeholder="Amount" />
    <input type="text" name="unit[]" placeholder="Unit" />
    <button type="button" class="remove-btn" onclick="removeField(this)">Remove</button>
  `;

    container.appendChild(wrapper);
    updatePreview();
}

// Preview section
function updatePreview() {
    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value.trim();
    const tags = document.getElementById('tags').value.trim();

    document.getElementById('previewTitle').textContent =
        title || 'Recipe title';
    document.getElementById('previewCategory').textContent =
        `Category: ${category || '-'}`;
    document.getElementById('previewTags').textContent = `Tags: ${tags || '-'}`;

    const ingredientRows = document.querySelectorAll(
        '#ingredientsList .ingredient-row'
    );
    const previewIngredients = document.getElementById('previewIngredients');
    previewIngredients.innerHTML = '';

    let hasIngredients = false;

    ingredientRows.forEach((row) => {
        const ingredient = row
            .querySelector('input[name="ingredient[]"]')
            .value.trim();
        const amount = row.querySelector('input[name="amount[]"]').value.trim();
        const unit = row.querySelector('input[name="unit[]"]').value.trim();

        if (ingredient) {
            hasIngredients = true;
            const li = document.createElement('li');
            li.textContent = `${ingredient}${amount ? ` - ${amount}` : ''}${unit ? ` ${unit}` : ''}`;
            previewIngredients.appendChild(li);
        }
    });

    if (!hasIngredients) {
        previewIngredients.innerHTML = '<li>No ingredients added yet.</li>';
    }

    const steps = document.querySelectorAll('textarea[name="steps[]"]');
    const previewSteps = document.getElementById('previewSteps');
    previewSteps.innerHTML = '';

    let hasSteps = false;

    steps.forEach((step) => {
        const value = step.value.trim();
        if (value) {
            hasSteps = true;
            const li = document.createElement('li');
            li.textContent = value;
            previewSteps.appendChild(li);
        }
    });

    if (!hasSteps) {
        previewSteps.innerHTML = '<li>No steps added yet.</li>';
    }

    const images = document.querySelectorAll('input[name="images[]"]');
    const previewImages = document.getElementById('previewImages');
    previewImages.innerHTML = '';

    let hasImages = false;

    images.forEach((image) => {
        const value = image.value.trim();
        if (value) {
            hasImages = true;
            const img = document.createElement('img');
            img.src = value;
            img.alt = 'Recipe image';
            previewImages.appendChild(img);
        }
    });

    if (!hasImages) {
        previewImages.innerHTML = '<p>No images added yet.</p>';
    }
}

document.addEventListener('input', updatePreview);

// Combine data
document.getElementById('recipeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        tags: document
            .getElementById('tags')
            .value.split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag !== ''),
        ingredients: [
            ...document.querySelectorAll('#ingredientsList .ingredient-row')
        ]
            .map((row) => {
                const ingredient = row
                    .querySelector('input[name="ingredient[]"]')
                    .value.trim();
                const amount = row
                    .querySelector('input[name="amount[]"]')
                    .value.trim();
                const unit = row
                    .querySelector('input[name="unit[]"]')
                    .value.trim();

                if (!ingredient) return null;

                return {
                    ingredient,
                    amount,
                    unit
                };
            })
            .filter((item) => item !== null),
        steps: [...document.querySelectorAll('textarea[name="steps[]"]')]
            .map((textarea) => textarea.value.trim())
            .filter((value) => value !== ''),
        images: [...document.querySelectorAll('input[name="images[]"]')]
            .map((input) => input.value.trim())
            .filter((value) => value !== '')
    };

    console.log('Recipe data:', formData); // DEV --- CONNECT TO API HERE
});

updatePreview();
