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
    
    // --- START: PROFESSIONAL AUDIO ENGINE SETUP ---

    // 1. Create a single, shared AudioContext. It starts 'suspended' by default.
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // 2. The Professional Audio Unlock Solution
    // This function will be called ONLY ONCE on the first user click/tap.
    function unlockAudio() {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }
    // Listen for the first interaction anywhere on the page.
    // The '{ once: true }' option is a professional touch - it automatically removes the listener after it runs once.
    document.body.addEventListener('click', unlockAudio, { once: true });
    document.body.addEventListener('touchstart', unlockAudio, { once: true });


    // 3. The Keyboard Click Sound Designer
    function playKeySound() {
        // If the audio is not yet unlocked, do nothing.
        if (audioContext.state !== 'running') return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Sound Design
        oscillator.type = 'triangle';
        const randomPitch = Math.random() * 400 + 600;
        oscillator.frequency.setValueAtTime(randomPitch, audioContext.currentTime);

        // "Click" Envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    // --- END: PROFESSIONAL AUDIO ENGINE SETUP ---


    // --- Typing Animation (Now uses the professional sound engine) ---
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
                            
                            if (char !== ' ') {
                                playKeySound(); // This will now work correctly after the first click.
                            }
                            
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
            { img: 'assets/images/B-sir2.png', name: 'Niranjan', qual: 'MCom, MBA (pursuing)', desc: 'HOD, Dept of Commerce' }
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
});
