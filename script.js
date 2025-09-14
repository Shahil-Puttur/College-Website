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
const managementTextWrapper = document.getElementById('managementText');

if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
        managementTextWrapper.classList.toggle('expanded');
        if (managementTextWrapper.classList.contains('expanded')) {
            readMoreBtn.textContent = 'Read Less';
        } else {
            readMoreBtn.textContent = 'Read More';
        }
    });
}

// --- Typing Animation Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('leaderExperienceText');
    const fullText = "Vidyarashmi First Grade College, Savanoor is one of the best places to learn and grow. The supportive teachers, friendly environment, and good facilities make studies enjoyable. Along with academics, the college also encourages cultural and sports activities. Truly a great place for overall development!";
    
    if (textElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0;
                    textElement.innerHTML = '';
                    const typingInterval = setInterval(() => {
                        if (i < fullText.length) {
                            textElement.innerHTML += fullText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typingInterval);
                            textElement.classList.add('typing-done');
                        }
                    }, 50);
                    
                    observer.unobserve(textElement);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(textElement);
    }
});
