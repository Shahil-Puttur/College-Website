// --- main.js ---
// This file contains shared JavaScript for ALL pages.

// Mobile Navigation Menu Logic
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".overlay");

function openMenu() {
    if (hamburger && navMenu && overlay) {
        hamburger.classList.add("active");
        navMenu.classList.add("active");
        overlay.classList.add("active");
    }
}

function closeMenu() {
    if (hamburger && navMenu && overlay) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
    }
}

if (hamburger) {
    hamburger.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

if (overlay) {
    overlay.addEventListener("click", closeMenu);
}

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", closeMenu));
