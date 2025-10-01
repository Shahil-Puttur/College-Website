// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        showAdminPanel();
    }
});

// LOGIN LOGIC - NOW SECURE!
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const loginButton = loginForm.querySelector('button');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginButton.disabled = true; // Prevent multiple clicks
    loginButton.textContent = 'Checking...';
    loginError.style.display = 'none';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // YOUR RENDER BACKEND URL IS NOW ADDED HERE
    const BACKEND_URL = 'https://college-backened.onrender.com/login'; 

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) { // Check if response is successful
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            showAdminPanel();
        } else {
            loginError.textContent = data.message || 'Invalid credentials';
            loginError.style.display = 'block';
        }

    } catch (error) {
        console.error('Login request failed:', error);
        loginError.textContent = 'Could not connect to the server. Please try again.';
        loginError.style.display = 'block';
    } finally {
        loginButton.disabled = false;
        loginButton.textContent = 'Login';
    }
});


// LOGOUT LOGIC
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('admin-panel').style.display = 'none';
    // Optional: reload the page to clear everything
    window.location.reload();
});

function showAdminPanel() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    loadTicker();
    loadNotices();
    loadGalleryItems();
}

// --- TICKER MANAGEMENT ---
const tickerForm = document.getElementById('ticker-form');
const tickerList = document.getElementById('ticker-list');

async function loadTicker() {
    try {
        const { data, error } = await supabase.from('ticker').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        tickerList.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <span>${item.message.substring(0, 50)}...</span>
                    <button class="delete-btn" onclick="deleteTicker(${item.id})">Delete</button>
                `;
                tickerList.appendChild(div);
            });
        } else {
            tickerList.innerHTML = '<p>No ticker message found.</p>';
        }
    } catch (error) {
        console.error('Error loading ticker:', error);
        tickerList.innerHTML = '<p>Could not load ticker data.</p>';
    }
}

tickerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.getElementById('ticker-message').value;
    const { error } = await supabase.from('ticker').insert({ message: message });
    if (error) {
        alert('Error adding ticker: ' + error.message);
    } else {
        alert('Ticker updated successfully!');
        tickerForm.reset();
        loadTicker();
    }
});

async function deleteTicker(id) {
    if (confirm('Are you sure you want to delete this ticker message?')) {
        const { error } = await supabase.from('ticker').delete().eq('id', id);
        if (error) {
            alert('Error deleting ticker: ' + error.message);
        } else {
            loadTicker();
        }
    }
}

// --- NOTICE MANAGEMENT ---
const noticeForm = document.getElementById('notice-form');
const noticeList = document.getElementById('notice-list');

async function loadNotices() {
    try {
        const { data, error } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        noticeList.innerHTML = '';
        if (data) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <span>${item.heading}</span>
                    <button class="delete-btn" onclick="deleteNotice(${item.id}, '${item.image_url}')">Delete</button>
                `;
                noticeList.appendChild(div);
            });
        }
    } catch(error) {
        console.error('Error loading notices:', error);
        noticeList.innerHTML = '<p>Could not load notices.</p>';
    }
}

noticeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const heading = document.getElementById('notice-heading').value;
    const description = document.getElementById('notice-description').value;
    const imageFile = document.getElementById('notice-image').files[0];
    let imageUrl = null;

    if (imageFile) {
        const filePath = `public/${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage.from('notice-images').upload(filePath, imageFile);
        if (uploadError) {
            alert('Image upload failed: ' + uploadError.message);
            return;
        }
        const { data } = supabase.storage.from('notice-images').getPublicUrl(filePath);
        imageUrl = data.publicUrl;
    }

    const { error: insertError } = await supabase.from('notices').insert({
        heading: heading,
        description: description,
        image_url: imageUrl
    });

    if (insertError) {
        alert('Error adding notice: ' + insertError.message);
    } else {
        alert('Notice added successfully!');
        noticeForm.reset();
        loadNotices();
    }
});

async function deleteNotice(id, imageUrl) {
    if (confirm('Are you sure you want to delete this notice?')) {
        const { error: dbError } = await supabase.from('notices').delete().eq('id', id);
        if (dbError) {
            alert('Error deleting notice from database: ' + dbError.message);
            return;
        }
        if (imageUrl && imageUrl !== 'null') {
            const fileName = imageUrl.split('/').pop();
            await supabase.storage.from('notice-images').remove([`public/${fileName}`]);
        }
        loadNotices();
    }
}

// --- GALLERY MANAGEMENT ---
const galleryForm = document.getElementById('gallery-form');
const galleryList = document.getElementById('gallery-list');

async function loadGalleryItems() {
    try {
        const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        galleryList.innerHTML = '';
        if (data) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <span>${item.caption || 'No Caption'}</span>
                    <button class="delete-btn" onclick="deleteGalleryItem(${item.id}, '${item.image_url}')">Delete</button>
                `;
                galleryList.appendChild(div);
            });
        }
    } catch(error) {
        console.error('Error loading gallery items:', error);
        galleryList.innerHTML = '<p>Could not load gallery items.</p>';
    }
}

galleryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const caption = document.getElementById('gallery-caption').value;
    const imageFile = document.getElementById('gallery-image').files[0];

    const filePath = `public/${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage.from('gallery-images').upload(filePath, imageFile);
    if (uploadError) {
        alert('Image upload failed: ' + uploadError.message);
        return;
    }

    const { data } = supabase.storage.from('gallery-images').getPublicUrl(filePath);
    const imageUrl = data.publicUrl;

    const { error: insertError } = await supabase.from('gallery').insert({
        caption: caption,
        image_url: imageUrl
    });

    if (insertError) {
        alert('Error adding to gallery: ' + insertError.message);
    } else {
        alert('Image added to gallery!');
        galleryForm.reset();
        loadGalleryItems();
    }
});

async function deleteGalleryItem(id, imageUrl) {
     if (confirm('Are you sure you want to delete this gallery item?')) {
        const { error: dbError } = await supabase.from('gallery').delete().eq('id', id);
        if (dbError) {
            alert('Error deleting item: ' + dbError.message);
            return;
        }
        if (imageUrl && imageUrl !== 'null') {
            const fileName = imageUrl.split('/').pop();
            await supabase.storage.from('gallery-images').remove([`public/${fileName}`]);
        }
        loadGalleryItems();
    }
}
