// fetch data

fetch('https://raw.githubusercontent.com/marie-bu/EcoArava/f5393f81915e625816d7293b97e24d94cf0d1cb3/recipes.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendDataGrid(data);
        appendDataLightbox(data);
    })
    .catch(function(error) {
        console.log(error);
    });

// DOM elements

const recipesGrid = document.querySelector(".recipes-grid");
const recipesLightbox = document.querySelector(".recipes-details");
const recipesInstructions = document.querySelector(".recipes-instructions");
const closeLightboxBtn = document.querySelector(".btn-close");
const tags = document.querySelectorAll(".tag");

// HTML

function HTMLgrid(object, i) {
    recipesGrid.innerHTML += `
        <figure class="recipes-grid-item" onclick="openLightbox();showSlide(`+[i]+`)">
            <img src="recipes/`+object[i].image+`" alt="">
            <figcaption><em class="centered">`+object[i].name+`</em></figcaption>
        </figure>`
};

function HTMLlightbox(object, i) {
    recipesLightbox.innerHTML += `
    <div class="recipes-details-item">
      <img src="recipes/`+object[i].image+`" alt="">
      <div class="item-ingredients">
        <p class="bold">Ingredients</p>
        <ul class="content-left-ingredients"></ul>
      </div>
      <h3 class="item-title">`+object[i].name+`</h3>
      <p class="item-level"><span class="bold">Level :</span> `+object[i].level+`</p>
      <p class="item-directions"><span class="bold">Directions :</span> `+object[i].directions+`</p>
</div>`
}

// Tag and filter display

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
    for (let i=1; i<data.recipes.length; i++) {
        HTMLgrid(data.recipes, i);
    }
};

function appendDataLightbox(data) {
    for (let i=0; i<data.recipes.length; i++) {
      HTMLlightbox(data.recipes, i);

      const ingredients = document.querySelectorAll(".content-left-ingredients");
        
      Array.from(data.recipes[i].ingredients).forEach((ingredient)=>{
        ingredients[i].innerHTML +=
        `<li>
          <span class="item-ingredient">`+ingredient.ingredient+` :</span>
          <span class="item-quantity"> `+ingredient.quantity+`</span>
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

  /*function openLbKeyboard(event, element){
    if(event.key=="Enter"){
      openLightbox(element)
    }
  }*/
  
  function showSlide(n){
    const mediasArray = document.querySelectorAll(".recipes-details-item");

    for (i=0; i<mediasArray.length; i++) {
      mediasArray[i].style.display = "none";
    }

    mediasArray[n].style.display = "grid";
  }
