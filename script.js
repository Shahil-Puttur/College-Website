// --- Pro Mobile Navigation Menu ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".overlay"); // Get the new overlay

// Function to open the menu
function openMenu() {
    hamburger.classList.add("active");
    navMenu.classList.add("active");
    overlay.classList.add("active");
}

// Function to close the menu
function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    overlay.classList.remove("active");
}

// Event listener for the hamburger icon
hamburger.addEventListener("click", () => {
    // If the menu is already active, close it. Otherwise, open it.
    if (navMenu.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Event listeners to close the menu when a link or the overlay is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", closeMenu));
overlay.addEventListener("click", closeMenu);


// --- Initialize AOS (Animate on Scroll) Library ---
AOS.init({
    duration: 1000,
    once: true,
});
