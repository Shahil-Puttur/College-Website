// --- script.js ---
// This file contains JavaScript ONLY for the HOMEPAGE (index.html).

// --- NEW PRELOADER LOGIC ---
// This logic ensures the preloader is shown until the entire page (including images) is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Add 'loading' class immediately to hide content until it's ready
    document.body.classList.add('loading');
});

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Start the fade-out process for the preloader
        preloader.classList.add('preloader-hidden');

        // After the preloader has faded out, remove the loading class from the body
        // This will trigger the fade-in of the main content (header, main, footer)
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500); // This duration should match the transition time in the CSS
    } else {
        // If for some reason there is no preloader, just show the content
        document.body.classList.remove('loading');
    }
});


// --- DYNAMIC CONTENT LOADER FROM SUPABASE ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.news-ticker-section')) {
        loadTicker();
    }
    if (document.getElementById('notice-slider-container')) {
        loadHomepageNotices();
    }
});

async function loadTicker() {
    const tickerWrapper = document.querySelector('.scrolling-text-wrapper');
    if (!tickerWrapper) return;
    
    try {
        const { data, error } = await supaClient.from('ticker').select('message').order('created_at', { ascending: false }).limit(1).single();
        if (error && error.code !== 'PGRST116') throw error;

        if (data && data.message) {
            const message = data.message + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            tickerWrapper.innerHTML = `<span class="scrolling-text-item">${message}</span><span class="scrolling-text-item">${message}</span>`;
        } else {
            document.querySelector('.news-ticker-section').style.display = 'none';
        }
    } catch (error) {
        console.error("Error loading ticker:", error);
        document.querySelector('.news-ticker-section').style.display = 'none';
    }
}

async function loadHomepageNotices() {
    const noticeContainer = document.getElementById('notice-slider-container');
    if (!noticeContainer) return;

    try {
        const { data, error } = await supaClient.from('notices').select('*').order('created_at', { ascending: false }).limit(5);
        if (error) throw error;

        if (data && data.length > 0) {
            noticeContainer.innerHTML = '';
            const track = document.createElement('div');
            track.className = 'notice-slider-track';
            const randomImages = ['random1.png', 'random2.png', 'random3.png', 'random4.png'];

            data.forEach(notice => {
                let imageUrl = notice.image_url;
                if (!imageUrl) {
                    imageUrl = `assets/images/${randomImages[Math.floor(Math.random() * randomImages.length)]}`;
                }

                const slide = document.createElement('div');
                slide.className = 'notice-slide';
                slide.innerHTML = `
                    <img src="${imageUrl}" alt="${notice.heading}">
                    <div class="notice-slide-content">
                        <h3><a href="notices.html?id=${notice.id}">${notice.heading}</a></h3>
                    </div>
                `;
                track.appendChild(slide);
            });
            noticeContainer.appendChild(track);

            let currentSlide = 0;
            const slides = track.children;
            if (slides.length > 1) {
                setInterval(() => {
                    currentSlide = (currentSlide + 1) % slides.length;
                    track.style.transform = `translateX(-${currentSlide * 100}%)`;
                }, 4000);
            }
        } else {
            noticeContainer.innerHTML = '<p style="padding: 2rem; text-align: center;">No recent notices to display.</p>';
        }
    } catch (error) {
        console.error("Error loading notices:", error);
        noticeContainer.innerHTML = '<p style="padding: 2rem; text-align: center;">Could not load notices.</p>';
    }
}

// --- HOMEPAGE-ONLY WEBSITE FUNCTIONALITY ---
// "Read More" Button Logic
const readMoreBtn = document.getElementById('readMoreBtn');
const managementTextWrapper = document.getElementById('managementText');
if (readMoreBtn) {
    readMoreBtn.addEventListener('click', () => {
        managementTextWrapper.classList.toggle('expanded');
        readMoreBtn.textContent = managementTextWrapper.classList.contains('expanded') ? 'Read Less' : 'Read More';
    });
}

// Logic that runs after DOM is loaded for homepage-specific items
document.addEventListener('DOMContentLoaded', () => {
    
    // Typing Animation
    const textElement = document.getElementById('leaderExperienceText');
    if (textElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fullText = "Vidyarashmi First Grade College, Savanoor is one of the best places to learn and grow. The supportive teachers, friendly environment, and good facilities make studies enjoyable. Along with academics, the college also encourages cultural and sports activities. Truly a great place for overall development!";
                    let i = 0; textElement.innerHTML = '';
                    const typingInterval = setInterval(() => {
                        if (i < fullText.length) {
                            textElement.innerHTML += fullText.charAt(i); i++;
                        } else {
                            clearInterval(typingInterval); textElement.classList.add('typing-done');
                        }
                    }, 50);
                    observer.unobserve(textElement);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(textElement);
    }

    // Professor Carousel
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
        ];
        professorData.forEach(prof => {
            const slide = document.createElement('div');
            slide.className = 'professor-slide';
            const qualText = prof.qual || '', descText = prof.desc || '';
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
                if (newIndex === 0) { 
                    slide.classList.add('slide-active'); 
                } else if (newIndex === 1) { 
                    slide.classList.add('slide-next'); 
                } else if (newIndex === slides.length - 1) { 
                    slide.classList.add('slide-prev'); 
                } else { 
                    slide.classList.add('slide-hidden'); 
                } 
            }); 
        }
        function slideNext() { 
            currentIndex = (currentIndex + 1) % slides.length; 
            updateCarousel(); 
        }
        if (slides.length > 1) { 
            updateCarousel(); 
            setInterval(slideNext, 3000); 
        }
    }

    // Custom Audio Player (for bca.html)
    const audioPlayer = document.getElementById('bcaAudioPlayer');
    if (audioPlayer) {
        const audio = document.getElementById('bcaAudio');
        const playBtn = document.getElementById('playBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        playBtn.addEventListener('click', () => { 
            audio.play(); 
            playBtn.style.display = 'none'; 
            pauseBtn.style.display = 'flex'; 
        });
        pauseBtn.addEventListener('click', () => { 
            audio.pause(); 
            playBtn.style.display = 'flex'; 
            pauseBtn.style.display = 'none'; 
        });
    }

    // Latest Events Slider
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
        const track = document.createElement('div');
        track.className = 'event-slider-track';
        events.forEach((event, index) => {
            track.innerHTML += `<div class="event-slide"><img src="${event.img}" alt="${event.caption}"><div class="event-slide-caption">${event.caption}</div></div>`;
            if (dotsContainer) dotsContainer.innerHTML += `<div class="dot" data-index="${index}"></div>`;
        });
        eventSliderContainer.appendChild(track);
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;
        function showSlide(index) {
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');
        }
        function nextSlide() { 
            currentSlide = (currentSlide + 1) % events.length; 
            showSlide(currentSlide); 
        }
        if (events.length > 0) { 
            showSlide(0); 
            setInterval(nextSlide, 3000); 
        }
    }

    // =======================================================
    // FINAL PRO "FREE COURSES" GLOW ON SCROLL LOGIC
    // =======================================================
    const courseCards = document.querySelectorAll('.free-courses-section .course-card');
    if (courseCards.length > 0) {
        const observerOptions = {
            root: document.querySelector('.course-carousel-container'), // This is the scrollable area
            rootMargin: '0px',
            threshold: 0.75 // Trigger when 75% of the card is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // When a card is centered, add the glowing class
                    entry.target.classList.add('glowing');
                } else {
                    // When it's not centered, remove it
                    entry.target.classList.remove('glowing');
                }
            });
        }, observerOptions);

        // Tell the observer to watch each of the course cards
        courseCards.forEach(card => {
            observer.observe(card);
        });
    }
});
