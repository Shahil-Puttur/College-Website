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
AOS.init({ duration: 1000, once: true });

// --- "Read More" Button Logic ---
const readMoreBtn = document.getElementById('readMoreBtn');
const managementTextWrapper = document.getElementById('managementText');
if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
        managementTextWrapper.classList.toggle('expanded');
        readMoreBtn.textContent = managementTextWrapper.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
}

// --- LOGIC THAT RUNS ON EVERY PAGE LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Typing Animation (runs only if the element exists on the page) ---
    const textElement = document.getElementById('leaderExperienceText');
    if (textElement) {
        const fullText = "Vidyarashmi First Grade College, Savanoor is one of the best places to learn and grow. The supportive teachers, friendly environment, and good facilities make studies enjoyable. Along with academics, the college also encourages cultural and sports activities. Truly a great place for overall development!";
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0; textElement.innerHTML = '';
                    const typingInterval = setInterval(() => {
                        if (i < fullText.length) { textElement.innerHTML += fullText.charAt(i); i++; } 
                        else { clearInterval(typingInterval); textElement.classList.add('typing-done'); }
                    }, 50);
                    observer.unobserve(textElement);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(textElement);
    }

    // --- Professor Carousel (runs only if the element exists on the page) ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const professorData = [
            { img: 'assets/images/A-mam1.jpg', name: 'Prathibha', qual: 'MCA', desc: 'HOD of Bachelor of Computer Application' },
            { img: 'assets/images/A-mam2.jpg', name: 'Kaushalya S', qual: 'MSc', desc: 'Assistant Professor, IQAC Coordinator' },
            { img: 'assets/images/A-sir1.png', name: 'Venkaataramana', qual: '', desc: 'IC Professor' },
            { img: 'assets/images/A-mam3.
