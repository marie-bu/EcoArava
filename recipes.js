// fetch data

fetch('recipes.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendDataIndex(data);
    })
    .catch(function(error) {
        console.log(error);
    });

// DOM elements

const tag = document.querySelectorAll(".tag");

// Tag and filter

tag.forEach(tag => tag.addEventListener("click", function(tag) {
    tag.target.style.backgoundColor = "$color-quaternary";
}));


