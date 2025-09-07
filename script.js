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
});

// --- "Read More" Button Logic ---
const readMoreBtn = document.getElementById('readMoreBtn');
const managementText = document.getElementById('managementText');

if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
        const wrapper = readMoreBtn.previousElementSibling; // Get the text-wrapper
        wrapper.classList.toggle('expanded');
        if (wrapper.classList.contains('expanded')) {
            readMoreBtn.textContent = 'Read Less';
        } else {
            readMoreBtn.textContent = 'Read More';
        }
    });
                }
