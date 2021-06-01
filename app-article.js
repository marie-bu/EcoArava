// DOM elements

const article = document.querySelector(".article");
const articleTitle = document.querySelector(".h2");
const asideNav = document.querySelector(".article-nav");
const asideBtn = document.querySelector(".btn-aside");
const paragraphBtns = document.querySelectorAll(".btn-show-text");

// Aside : display/hide navigation

asideBtn.addEventListener("click", ()=>{
    asideBtn.classList.toggle("btn-aside-clicked");
    asideNav.classList.toggle("article-nav-closed");
    articleTitle.classList.toggle("h2-closed");
    article.classList.toggle("article-narrow");
    document.activeElement.blur();
});

// Article : display/hide paragraphs

paragraphBtns.forEach(btn => {
    btn.addEventListener("click", ()=>{
        btn.nextElementSibling.classList.toggle("hidden-p");
        btn.classList.toggle("btn-show-text-clicked");
        document.activeElement.blur();
    });
});