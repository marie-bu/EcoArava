// fetch data

fetch('https://raw.githubusercontent.com/marie-bu/EcoArava/f5393f81915e625816d7293b97e24d94cf0d1cb3/recipes.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        createArray(data.recipes);
        appendDataGrid(data.recipes);
        appendDataLightbox(data.recipes);
    })
    .catch(function(error) {
        console.log(error);
    });

// DOM elements

const recipesGrid = document.querySelector(".recipes-grid");
const recipesLightbox = document.querySelector(".recipes-lb");
const recipesLightboxItems = document.querySelector(".recipes-lb-details");
const recipesInstructions = document.querySelector(".recipes-instructions");
const closeLightboxBtn = document.querySelector(".btn-close");

const tags = document.querySelectorAll(".tag");
const filters = document.querySelector(".article-nav-filters");

// HTML

function HTMLgrid(object, i) {
    recipesGrid.innerHTML += `
        <figure class="recipes-grid-item" onclick="openLightbox();openRecipe(`+[i+1]+`)">
            <img src="recipes/`+object[i].image+`" alt="">
            <figcaption><em class="centered">`+object[i].name+`</em></figcaption>
        </figure>`
};

function HTMLlightbox(object, i) {
    recipesLightboxItems.innerHTML += `
    <div class="recipes-lb-item">
        <img src="recipes/`+object[i].image+`" alt="">
        <h2 class="item-title">`+object[i].name+`</h2>
        <p class="item-level"><span class="bold">Level :</span> `+object[i].level+`</p>
        <div class="item-ingredients">
          <p class="bold">Ingredients :</p>
          <ul class="item-ingredients-list"></ul>
        </div>
        <p class="item-directions"><span class="bold">Directions :</span> `+object[i].directions+`</p>
    </div>`
}

function units(element) {
  if (element.quantity == undefined){
      element.quantity = ""
  }
  if (element.unit == undefined){
    element.unit = ""
  }
}

// Filter tags display

tags.forEach(tag => tag.addEventListener("click", function(e) {
    let clickedTag = e.target;
    let x = clickedTag.getAttribute("aria-pressed");
    if (x == "false") {
        x = "true";
        clickedTag.classList.add("tag-selected");
    } else {
        x = "false";
        clickedTag.classList.remove("tag-selected");
        document.activeElement.blur();
    }
    clickedTag.setAttribute("aria-pressed", x);
}));

// Append data recipes

function appendDataGrid(data) {
    for (let i=0; i<data.length; i++) {
        HTMLgrid(data, i);
    }
};

function appendDataLightbox(data) {
    for (let i=0; i<data.length; i++) {
      HTMLlightbox(data, i);

      const ingredients = document.querySelectorAll(".item-ingredients-list");
        
      Array.from(data[i].ingredients).forEach((ingredient)=>{
        units(ingredient);
        ingredients[i].innerHTML +=
        `<li>
          <span class="item-ingredient">`+ingredient.ingredient+` :</span>
          <span class="item-quantity"> `+ingredient.quantity+`</span>
          <span class="item-unit"> `+ingredient.unit+`</span>
        </li>`;
    });
  }
}

// Lightbox : open, close, show clicked recipe

function openLightbox() {
  recipesLightbox.style.display = "block";
  recipesLightbox.setAttribute("tabindex", "0");
  recipesLightbox.focus();

  recipesGrid.style.display = "none";
  recipesInstructions.style.display = "none";
}

function closeLightbox(){
  recipesLightbox.style.display = null;
  recipesGrid.style.display = null;
  recipesInstructions.style = null;
}
  
// Lightbox : show clicked recipe, skip next-previous

let slideIndex = 1;

function skipRecipe(n) {
  show(slideIndex += n)
  document.activeElement.blur();
}
function openRecipe(n){
  show(slideIndex = n)
}

function show(n){
  const mediasArray = document.querySelectorAll(".recipes-lb-item");
  
  if (n<1){
    slideIndex = mediasArray.length;
  } else if (n>mediasArray.length){
    slideIndex = 1;
  }

  for (let i=0; i<mediasArray.length; i++){
      mediasArray[i].style.display = "none";
    }

  mediasArray[slideIndex-1].style.display = "grid";
}

// Filter recipes

const recipes = [];
let recipesToKeep = [];
let clickedTags = new Set();

function createArray(data) {
  for (let i=0; i<data.length; i++) {
    recipes.push(data[i]);
}
}

function getSelectedTags(clicked) {
  if (clicked.getAttribute("aria-pressed") === "true") {
    clickedTags.add(clicked.innerHTML);
  } else if (clicked.getAttribute("aria-pressed") === "false") {
    clickedTags.delete(clicked.innerHTML);
  }
}

function filterRecipes() {
  recipesToKeep = [];
  for (recipe of recipes) {
    if (clickedTags.has(recipe.type)) {
      recipesToKeep.push(recipe);
    }
  }
}

function refreshDOM() {
  recipesGrid.innerHTML = "";
  recipesLightboxItems.innerHTML = "";
  if (recipesToKeep.length > 0) {
    appendDataGrid(recipesToKeep);
    appendDataLightbox(recipesToKeep);
  } else {
    appendDataGrid(recipes);
    appendDataLightbox(recipes);
  }
}

filters.addEventListener("click", (element)=>{
  let clicked = element.target;
  getSelectedTags(clicked);
  filterRecipes();
  refreshDOM();
  if (recipesLightbox.style.display = "block") {
    closeLightbox();
  }
});