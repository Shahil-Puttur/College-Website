// --- Mobile Navigation Menu ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));


// --- Initialize AOS (Animate on Scroll) Library ---
AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true,     // Whether animation should happen only once
});


// --- Placeholder for Supabase Code ---
// We will add the code to fetch notices and events here in the next step!
// console.log("Supabase integration will go here.");
