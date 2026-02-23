const BASE_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?a=";
const DETAILS_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

let recipesData = [];

async function fetchRecipes() {
    const cuisine = document.getElementById("cuisine").value;
    const count = parseInt(document.getElementById("count").value);
    const status = document.getElementById("status");
    const container = document.getElementById("recipes");

    if (!count || count < 1) {
        alert("Enter valid number of recipes");
        return;
    }

    status.innerText = "Loading recipes...";
    container.innerHTML = "";

    try {
        const res = await fetch(BASE_URL + cuisine);
        const data = await res.json();

        recipesData = data.meals.slice(0, count);

        renderRecipes(recipesData);
        status.innerText = "";

    } catch (error) {
        status.innerText = "❌ Failed to load recipes";
    }
}

function renderRecipes(recipes) {
    const container = document.getElementById("recipes");

    container.innerHTML = recipes.map(recipe => `
        <div class="recipe-card" onclick="showDetails(${recipe.idMeal})">
            <img src="${recipe.strMealThumb}">
            <div class="recipe-info">
                <div class="recipe-title">${recipe.strMeal}</div>
                <div class="recipe-desc">Click for full recipe details</div>
            </div>
        </div>
    `).join("");
}

async function showDetails(id) {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");

    modal.classList.remove("hidden");
    modalBody.innerHTML = "Loading details...";

    try {
        const res = await fetch(DETAILS_URL + id);
        const data = await res.json();
        const recipe = data.meals[0];

        modalBody.innerHTML = `
            <h2>${recipe.strMeal}</h2>
            <img src="${recipe.strMealThumb}" style="width:100%; border-radius:8px; margin:10px 0;">
            <p><strong>Category:</strong> ${recipe.strCategory}</p>
            <p><strong>Instructions:</strong></p>
            <p>${recipe.strInstructions}</p>
        `;

    } catch {
        modalBody.innerHTML = "❌ Failed to load details";
    }
}

function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}