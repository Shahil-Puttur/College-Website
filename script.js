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
const managementTextWrapper = document.getElementById('managementText');
if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
        managementTextWrapper.classList.toggle('expanded');
        readMoreBtn.textContent = managementTextWrapper.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
}

// --- Typing Animation & Professor Carousel Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Typing Animation ---
    const textElement = document.getElementById('leaderExperienceText');
    const fullText = "Vidyarashmi First Grade College, Savanoor is one of the best places to learn and grow. The supportive teachers, friendly environment, and good facilities make studies enjoyable. Along with academics, the college also encourages cultural and sports activities. Truly a great place for overall development!";
    if (textElement) {
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

    // --- Professor Carousel ---
    const slides = document.querySelectorAll('.professor-slide');
    if (slides.length > 0) {
        const professorData = [
            { img: 'assets/images/A-mam1.jpg', name: 'Prathibha', qual: 'MCA', desc: 'HOD of Bachelor of Computer Application' },
            { img: 'assets/images/A-mam2.jpg', name: 'Kaushalya S', qual: 'MSc', desc: 'Assistant Professor, IQAC Coordinator' },
            { img: 'assets/images/A-sir1.png', name: 'Venkaataramana', qual: '', desc: 'IC Professor' },
            { img: 'assets/images/A-mam3.jpg', name: 'Vagdevi G', qual: 'MA in English', desc: '' },
            { img: 'assets/images/A-mam4.png', name: 'Harshitha A', qual: 'MSc CS', desc: 'Assistant Lecturer, Computer Science' },
            // --- NEW PROFESSORS ADDED HERE ---
            { img: 'assets/images/B-mam5.png', name: 'Nireeshma N Suvarna', qual: 'MCom, KSET', desc: 'Assistant Professor in Dept of Commerce' },
            { img: 'assets/images/B-mam6.jpg', name: 'Prathibha S', qual: 'M.A, M.Ed', desc: 'Lecturer in History' },
            { img: 'assets/images/B-sir2.png', name: 'Niranjan', qual: 'MCom, MBA (pursuing)', desc: 'HOD, Dept of Commerce' }
        ];
        let currentIndex = 0;
        function updateSlides() {
            const nextIndex = (currentIndex + 1) % professorData.length;
            const prevIndex = (currentIndex - 1 + professorData.length) % professorData.length;
            
            slides.forEach(slide => slide.className = 'professor-slide');
            
            populateSlide(slides[0], professorData[currentIndex]);
            slides[0].classList.add('active');
            
            populateSlide(slides[1], professorData[nextIndex]);
            slides[1].classList.add('next');
            
            populateSlide(slides[2], professorData[prevIndex]);
            slides[2].classList.add('prev');
        }
        function populateSlide(slideElement, data) {
            slideElement.querySelector('img').src = data.img;
            slideElement.querySelector('h3').textContent = data.name;
            const qualText = data.qual ? data.qual : '';
            const descText = data.desc ? data.desc : '';
            const separator = qualText && descText ? ', ' : '';
            slideElement.querySelector('p').textContent = `${qualText}${separator}${descText}`;
        }
        function showNext() {
            currentIndex = (currentIndex + 1) % professorData.length;
            updateSlides();
        }
        updateSlides();
        setInterval(showNext, 3000);
    }
});
