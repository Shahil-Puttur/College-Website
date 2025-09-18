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
    
    // --- START: FINAL 1 LAKH WORTH SLIDER SCRIPT ---
    const eventCarousel = document.querySelector('.events-carousel-container');
    if (eventCarousel) {
        const track = eventCarousel.querySelector('.events-carousel-track');
        const slides = Array.from(track.children);
        const nextButton = eventCarousel.querySelector('.carousel-btn.next');
        const prevButton = eventCarousel.querySelector('.carousel-btn.prev');
        
        // 1. CLONE SLIDES FOR SEAMLESS LOOP
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);
        track.append(firstClone);
        track.prepend(lastClone);

        const allSlides = Array.from(track.children);
        let currentIndex = 1; // Start on the first real slide
        let isTransitioning = false;
        let autoPlayInterval;
        
        const updatePosition = (useTransition = true) => {
            const slideWidth = slides[0].clientWidth;
            track.style.transition = useTransition ? 'transform 0.5s ease-in-out' : 'none';
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        const moveToNext = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            updatePosition();
        };

        const moveToPrev = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex--;
            updatePosition();
        };

        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(moveToNext, 3000); // 3-second autoplay
        };

        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            // Handle the seamless loop
            if (currentIndex === 0) { // If we're on the prepended clone
                currentIndex = slides.length; // Jump to the real last slide
                updatePosition(false); // Do it instantly
            } else if (currentIndex === allSlides.length - 1) { // If we're on the appended clone
                currentIndex = 1; // Jump to the real first slide
                updatePosition(false);
            }
        });
        
        nextButton.addEventListener('click', () => {
            moveToNext();
            resetAutoPlay();
        });

        prevButton.addEventListener('click', () => {
            moveToPrev();
            resetAutoPlay();
        });

        // Initial setup
        updatePosition(false);
        resetAutoPlay();

        // Recalculate on window resize to be fully responsive
        window.addEventListener('resize', () => updatePosition(false));
    }
    // --- END: FINAL SLIDER SCRIPT ---

    // --- Custom Audio Player (bca.html only) ---
    const audioPlayer = document.getElementById('bcaAudioPlayer');
    if (audioPlayer) {
        const audio = document.getElementById('bcaAudio');
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const playAudio = () => { 
            audio.play(); 
            playBtn.style.display = 'none'; 
            pauseBtn.style.display = 'flex'; 
        };
        const pauseAudio = () => { 
            audio.pause(); 
            playBtn.style.display = 'flex'; 
            pauseBtn.style.display = 'none'; 
        };
        playBtn.addEventListener('click', playAudio);
        pauseBtn.addEventListener('click', pauseAudio);
    }
});
