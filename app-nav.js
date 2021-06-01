// DOM elements

const headerH2 = document.querySelector(".logo-h2");
const menu = document.querySelector(".nav-menu");
const menuBtn = document.querySelector(".nav-btn");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");

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