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

// --- "Read More" Button Logic (index.html only) ---
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
                            const char = fullText.charAt(i);
                            textElement.innerHTML += char;
                            i++;
                        } else {
                            clearInterval(typingInterval);
                            textElement.classList.add('typing-done');
                        }
                    }, 50); // Typing speed
                    observer.unobserve(textElement);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(textElement);
    }

    // --- Professor Carousel (index.html only) ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const professorData = [
            { img: 'assets/images/A-mam1.jpg', name: 'Prathibha', qual: 'MCA', desc: 'HOD of Bachelor of Computer Application' },
            { img: 'assets/images/A-mam2.jpg', name: 'Kaushalya S', qual: 'MSc', desc: 'Assistant Professor, IQAC Coordinator' },
            { img: 'assets/images/A-sir1.png', name: 'Venkaataramana', qual: '', desc: 'IC Professor' },
            { img: 'assets/images/A-mam3.jpg', name: 'Vagdevi G', qual: 'MA in English', desc: '' },
            { img: 'assets/images/A-mam4.png', name: 'Harshitha A', qual: 'MSc CS', desc: 'Assistant Lecturer, Computer Science' },
            { img: 'assets/images/B-mam5.png', name: 'Nireeshma N Suvarna', qual: 'MCom, KSET', desc: 'Asst. Professor, Dept of Commerce' },
            { img: 'assets/images/B-mam6.jpg', name: 'Prathibha S', qual: 'M.A, M.Ed', desc: 'Lecturer in History' },
            { img: 'assets/images/B-sir2.png', name: 'Niranjan', qual: 'MCom, MBA (pursuing)', desc: 'HOD, Dept of Commerce' },
            // START: NEW PROFESSORS ADDED
            { img: 'assets/images/d1.jpg', name: 'Shivaprasad K R', qual: 'M.Com, B.Ed', desc: 'Asst. Prof. in Commerce' },
            { img: 'assets/images/d2.jpg', name: 'Sheshagiri', qual: 'Kannada Professor', desc: 'Vice Principal' },
            { img: 'assets/images/d3.png', name: 'Suma', qual: 'MA (Economics) B.Ed, KSET, MCom', desc: '' },
            { img: 'assets/images/d4.jpg', name: 'Girisha Bhat.k', qual: '', desc: 'Assistant professor' },
            { img: 'assets/images/d5.jpg', name: 'Dr Kiranachandra Rai B', qual: 'M.A, Mphil, PhD', desc: 'Dept of political science' },
            { img: 'assets/images/d6.jpg', name: 'Sahana', qual: '', desc: 'Office Staff' },
            { img: 'assets/images/d7.jpg', name: 'Bharath', qual: '', desc: 'Non-Teaching Staff' },
            { img: 'assets/images/d8.jpg', name: 'Bharath.S', qual: '', desc: 'Pt.Lecturer' },
            { img: 'assets/images/d9.jpg', name: 'Shreya', qual: '', desc: 'Liabrary Staff' },
            { img: 'assets/images/d10.jpg', name: 'Dr. Rajalakshmi Rai', qual: '', desc: 'Principal' }
            // END: NEW PROFESSORS ADDED
        ];

        professorData.forEach(prof => {
            const slide = document.createElement('div');
            slide.className = 'professor-slide';
            const qualText = prof.qual ? prof.qual : '';
            const descText = prof.desc ? prof.desc : '';
            const separator = qualText && descText ? ', ' : '';
            slide.innerHTML = `<img src="${prof.img}" alt="${prof.name}"><div class="professor-info"><h3>${prof.name}</h3><p>${qualText}${separator}${descText}</p></div>`;
            track.appendChild(slide);
        });

        const slides = Array.from(track.children);
        let currentIndex = 0;
        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.classList.remove('slide-active', 'slide-prev', 'slide-next', 'slide-hidden');
                let newIndex = (index - currentIndex + slides.length) % slides.length;
                if (newIndex === 0) { slide.classList.add('slide-active'); } 
                else if (newIndex === 1) { slide.classList.add('slide-next'); } 
                else if (newIndex === slides.length - 1) { slide.classList.add('slide-prev'); } 
                else { slide.classList.add('slide-hidden'); }
            });
        }
        function slideNext() { currentIndex = (currentIndex + 1) % slides.length; updateCarousel(); }
        updateCarousel();
        setInterval(slideNext, 3000);
    }

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

    // --- START: UPDATED LATEST EVENTS SLIDER LOGIC ---
    const eventSliderContainer = document.getElementById('eventSlider');
    if (eventSliderContainer) {
        const events = [
            { img: 'assets/images/latest1.jpg', caption: 'Independence Day Cup' },
            { img: 'assets/images/latest2.jpg', caption: 'Dasara Kabaddi Winners' },
            { img: 'assets/images/latest3.jpg', caption: 'Aati Fest' },
            { img: 'assets/images/latest4.jpg', caption: 'IT Association Programme' },
            { img: 'assets/images/latest5.jpg', caption: 'Kannada Sahitya Programme' },
            { img: 'assets/images/latest6.jpg', caption: 'Arts Association Programme' },
            { img: 'assets/images/latest7.jpg', caption: 'Commerce Association Programme' }
        ];

        const dotsContainer = document.querySelector('.event-slider-dots');
        
        // Create a track for the slides to sit in
        const track = document.createElement('div');
        track.className = 'event-slider-track';
        
        // Create and add slides and dots
        events.forEach((event, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'event-slide';
            slide.innerHTML = `
                <img src="${event.img}" alt="${event.caption}">
                <div class="event-slide-caption">${event.caption}</div>
            `;
            track.appendChild(slide);

            // Create dot
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.dataset.index = index; // Store index for potential future click events
            dotsContainer.appendChild(dot);
        });

        // Add the track to the main container
        eventSliderContainer.appendChild(track);

        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;

        function showSlide(index) {
            // Move the track
            track.style.transform = `translateX(-${index * 100}%)`;
            
            // Update the active dot
            dots.forEach(dot => dot.classList.remove('active'));
            if(dots[index]) {
                dots[index].classList.add('active');
            }
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % events.length;
            showSlide(currentSlide);
        }

        // Initialize the slider and start the interval
        if (events.length > 0) {
            showSlide(0);
            setInterval(nextSlide, 3000); // Change image every 3 seconds
        }
    }
    // --- END: UPDATED LATEST EVENTS SLIDER LOGIC ---
});
