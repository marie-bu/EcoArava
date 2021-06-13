// DOM elements

const article = document.querySelector(".article");
const articleTitle = document.querySelector(".h2");
const asideNav = document.querySelector(".article-nav");
const asideBtn = document.querySelector(".btn-aside");
const paragraphBtns = document.querySelectorAll(".btn-show-text");

// Change aria-label function

function changeAriaLabel(x, value1, value2) {
    if (x == value1) {
        x = value2;
    } else {
        x = value1;
    }
    asideBtn.setAttribute("aria-label", x);
}

// Aside : display/hide navigation

asideBtn.addEventListener("click", ()=>{
    asideBtn.classList.toggle("btn-aside-clicked");
    asideNav.classList.toggle("article-nav-closed");
    articleTitle.classList.toggle("h2-closed");
    article.classList.toggle("article-narrow");
    document.activeElement.blur();

    let x = asideBtn.getAttribute("aria-label");
    changeAriaLabel(x, "Open side-bar", "Close side-bar");
});

// Article : display/hide paragraphs

paragraphBtns.forEach(btn => {
    btn.addEventListener("click", ()=>{
        btn.nextElementSibling.classList.toggle("hidden-p");
        btn.classList.toggle("btn-show-text-clicked");
    });
    btn.addEventListener("keydown", (event)=>{
        if (event.key === "Enter") {
            btn.nextElementSibling.classList.toggle("hidden-p");
            btn.classList.toggle("btn-show-text-clicked");
        }
    })
});