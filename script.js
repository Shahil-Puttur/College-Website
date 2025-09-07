// --- Pro Mobile Navigation Menu ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".overlay");

function openMenu() {
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    overlay.classList.add("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
}

hamburger.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", closeMenu));
overlay.addEventListener("click", closeMenu);


// --- Initialize AOS (Animate on Scroll) Library ---
AOS.init({
    duration: 1000,
    once: true,
});```

Now, refresh your page. The NSS and Red Cross sections will have their background images, just like you wanted.
