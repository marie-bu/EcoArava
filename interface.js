// DOM elements

// header
const headerH2 = document.querySelector(".logo-h2");
const menu = document.querySelector(".nav-menu");
const menuBtn = document.querySelector(".nav-btn");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");

// article + aside

const article = document.querySelector(".article");
const articleTitle = document.querySelector(".h2");
const asideNav = document.querySelector(".article-nav");
const asideBtn = document.querySelector(".btn-aside");
const paragraphBtns = document.querySelectorAll(".btn-show-text");

// Open-close navigation menu

function openNav() {
    headerH2.style.marginBottom = "45px";
    line2.style.width = "24px";
    line3.style.width = "29px";
    menu.id = "opened-menu";
}

function closeNav() {
    headerH2.style.marginBottom = "0";
    line2.style.width = null;
    line3.style.width = null;
    menu.id = null;
}

menuBtn.addEventListener("click", ()=> {
    let x = menuBtn.getAttribute("aria-expanded");
    if (x == "false") {
        x = "true";
        openNav();
    } else {
        x = "false";
        closeNav();
    }
    menuBtn.setAttribute("aria-expanded", x);
});

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