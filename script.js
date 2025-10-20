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
        // ... (The professor carousel code remains unchanged and is omitted for brevity)
    }

    // Custom Audio Player (for bca.html)
    const audioPlayer = document.getElementById('bcaAudioPlayer');
    if (audioPlayer) {
        // ... (The audio player code remains unchanged and is omitted for brevity)
    }

    // Latest Events Slider
    const eventSliderContainer = document.getElementById('eventSlider');
    if (eventSliderContainer) {
        // ... (The event slider code remains unchanged and is omitted for brevity)
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
