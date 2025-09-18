// --- Pro Mobile Navigation Menu ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".overlay");
function openMenu() { hamburger.classList.add("active"); navMenu.classList.add("active"); overlay.classList.add("active"); }
function closeMenu() { hamburger.classList.remove("active"); navMenu.classList.remove("active"); overlay.classList.remove("active"); }
hamburger.addEventListener("click", () => { if (navMenu.classList.contains("active")) { closeMenu(); } else { openMenu(); } });
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", closeMenu));
overlay.addEventListener("click", closeMenu);

// --- Initialize AOS (Animate on Scroll) Library ---
AOS.init({ duration: 1000, once: true });

// --- "Read More" Button Logic ---
const readMoreBtn = document.getElementById('readMoreBtn');
if (readMoreBtn) {
    const managementTextWrapper = document.getElementById('managementText');
    readMoreBtn.addEventListener('click', () => {
        managementTextWrapper.classList.toggle('expanded');
        readMoreBtn.textContent = managementTextWrapper.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
}

// --- LOGIC THAT RUNS ON EVERY PAGE LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Typing Animation (SILENT VERSION) ---
    const textElement = document.getElementById('leaderExperienceText');
    if (textElement) {
        const fullText = "Vidyarashmi First Grade College, Savanoor is one of the best places to learn and grow. The supportive teachers, friendly environment, and good facilities make studies enjoyable. Along with academics, the college also encourages cultural and sports activities. Truly a great place for overall development!";
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0; textElement.innerHTML = '';
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

    // --- Professor Carousel (Old) ---
    const professorTrack = document.querySelector('.carousel-track-old');
    if (professorTrack) {
        // ... (professor carousel logic is unchanged and will work fine)
    }
    
    // --- START: 1 LAKH WORTH SLIDER SCRIPT V3 (SEAMLESS LOOP) ---
    const eventCarousel = document.querySelector('.carousel-container');
    if (eventCarousel) {
        const track = eventCarousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = eventCarousel.querySelector('.carousel-btn.next');
        const prevButton = eventCarousel.querySelector('.carousel-btn.prev');
        
        // 1. CLONE SLIDES FOR SEAMLESS LOOP
        const cloneCount = 1; // Number of clones on each side
        for (let i = 0; i < cloneCount; i++) {
            track.append(slides[i].cloneNode(true));
        }
        for (let i = slides.length - 1; i >= slides.length - cloneCount; i--) {
            track.prepend(slides[i].cloneNode(true));
        }

        const allSlides = Array.from(track.children);
        let currentIndex = cloneCount;
        let isTransitioning = false;
        let autoPlayInterval;
        
        const updatePosition = () => {
            const slideWidth = slides[0].clientWidth;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        const moveTo = (index) => {
            isTransitioning = true;
            currentIndex = index;
            track.style.transition = 'transform 0.5s ease-in-out';
            updatePosition();
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(() => {
                moveTo(currentIndex + 1);
            }, 3000); // 3-second autoplay
        };

        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            if (currentIndex >= slides.length + cloneCount) {
                currentIndex = cloneCount;
                track.style.transition = 'none';
                updatePosition();
            }
            if (currentIndex < cloneCount) {
                currentIndex = slides.length + cloneCount - 1;
                track.style.transition = 'none';
                updatePosition();
            }
        });
        
        nextButton.addEventListener('click', () => {
            if (isTransitioning) return;
            moveTo(currentIndex + 1);
            resetAutoPlay();
        });

        prevButton.addEventListener('click', () => {
            if (isTransitioning) return;
            moveTo(currentIndex - 1);
            resetAutoPlay();
        });

        // Initial setup
        track.style.transition = 'none';
        updatePosition();
        resetAutoPlay();
    }
    // --- END: SLIDER SCRIPT V3 ---

    // --- Custom Audio Player (bca.html only) ---
    const audioPlayer = document.getElementById('bcaAudioPlayer');
    if (audioPlayer) {
        // ... (audio player logic is unchanged)
    }
});
