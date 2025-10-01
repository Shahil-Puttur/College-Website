// --- SECURE LOGIN LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // Only show the panel if the user is logged in
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
        showAdminPanel();
    }
});

const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const loginButton = loginForm.querySelector('button');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginButton.disabled = true;
    loginButton.textContent = 'Checking...';
    loginError.style.display = 'none';

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // The URL of your secure Render backend
    const BACKEND_URL = 'https://college-backened.onrender.com/login';

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            sessionStorage.setItem('isAdminLoggedIn', 'true');
            showAdminPanel();
        } else {
            loginError.textContent = data.message || 'Invalid credentials';
            loginError.style.display = 'block';
        }
    } catch (error) {
        console.error('Login request failed:', error);
        loginError.textContent = 'Could not connect to the login server. Please try again.';
        loginError.style.display = 'block';
    } finally {
        loginButton.disabled = false;
        loginButton.textContent = 'Login';
    }
});

// --- LOGOUT & PANEL DISPLAY ---
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    window.location.reload();
});

function showAdminPanel() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    // Load all data once the panel is shown
    loadTicker();
    loadNotices();
    loadGalleryItems();
}

// --- TICKER MANAGEMENT ---
const tickerForm = document.getElementById('ticker-form');
const tickerList = document.getElementById('ticker-list');

async function loadTicker() {
    try {
        // CORRECTED: Use supaClient
        const { data, error } = await supaClient.from('ticker').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        tickerList.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `<span>${item.message.substring(0, 50)}...</span> <button class="delete-btn" onclick="deleteTicker(${item.id})">Delete</button>`;
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
    // CORRECTED: Use supaClient
    const { error } = await supaClient.from('ticker').insert({ message: message });
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
        // CORRECTED: Use supaClient
        const { error } = await supaClient.from('ticker').delete().eq('id', id);
        if (error) alert('Error deleting ticker: ' + error.message);
        else loadTicker();
    }
}

// --- NOTICE MANAGEMENT ---
const noticeForm = document.getElementById('notice-form');
const noticeList = document.getElementById('notice-list');

async function loadNotices() {
    try {
        // CORRECTED: Use supaClient
        const { data, error } = await supaClient.from('notices').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        noticeList.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `<span>${item.heading}</span> <button class="delete-btn" onclick="deleteNotice(${item.id}, '${item.image_url}')">Delete</button>`;
                noticeList.appendChild(div);
            });
        } else {
            noticeList.innerHTML = '<p>No notices found.</p>';
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
    const submitBtn = noticeForm.querySelector('button');
    submitBtn.disabled = true;

    try {
        if (imageFile) {
            const filePath = `public/${Date.now()}-${imageFile.name}`;
            // CORRECTED: Use supaClient
            const { error: uploadError } = await supaClient.storage.from('notice-images').upload(filePath, imageFile);
            if (uploadError) throw uploadError;
            
            const { data } = supaClient.storage.from('notice-images').getPublicUrl(filePath);
            imageUrl = data.publicUrl;
        }

        const { error: insertError } = await supaClient.from('notices').insert({ heading, description, image_url: imageUrl });
        if (insertError) throw insertError;

        alert('Notice added successfully!');
        noticeForm.reset();
        loadNotices();
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        submitBtn.disabled = false;
    }
});

async function deleteNotice(id, imageUrl) {
    if (confirm('Are you sure you want to delete this notice?')) {
        const { error: dbError } = await supaClient.from('notices').delete().eq('id', id);
        if (dbError) {
            alert('Error deleting notice: ' + dbError.message);
            return;
        }
        if (imageUrl && imageUrl !== 'null') {
            const fileName = imageUrl.split('/').pop();
            await supaClient.storage.from('notice-images').remove([`public/${fileName}`]);
        }
        loadNotices();
    }
}

// --- GALLERY MANAGEMENT ---
const galleryForm = document.getElementById('gallery-form');
const galleryList = document.getElementById('gallery-list');

async function loadGalleryItems() {
    try {
        // CORRECTED: Use supaClient
        const { data, error } = await supaClient.from('gallery').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        galleryList.innerHTML = '';
        if (data && data.length > 0) {
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `<span>${item.caption || 'No Caption'}</span> <button class="delete-btn" onclick="deleteGalleryItem(${item.id}, '${item.image_url}')">Delete</button>`;
                galleryList.appendChild(div);
            });
        } else {
            galleryList.innerHTML = '<p>No gallery items found.</p>';
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
    if (!imageFile) {
        alert('Please select an image file to upload.');
        return;
    }
    const submitBtn = galleryForm.querySelector('button');
    submitBtn.disabled = true;

    try {
        const filePath = `public/${Date.now()}-${imageFile.name}`;
        // CORRECTED: Use supaClient
        const { error: uploadError } = await supaClient.storage.from('gallery-images').upload(filePath, imageFile);
        if (uploadError) throw uploadError;

        const { data } = supaClient.storage.from('gallery-images').getPublicUrl(filePath);
        const imageUrl = data.publicUrl;

        const { error: insertError } = await supaClient.from('gallery').insert({ caption, image_url: imageUrl });
        if (insertError) throw insertError;

        alert('Image added to gallery!');
        galleryForm.reset();
        loadGalleryItems();
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        submitBtn.disabled = false;
    }
});

async function deleteGalleryItem(id, imageUrl) {
     if (confirm('Are you sure you want to delete this gallery item?')) {
        const { error: dbError } = await supaClient.from('gallery').delete().eq('id', id);
        if (dbError) {
            alert('Error deleting item: ' + dbError.message);
            return;
        }
        if (imageUrl && imageUrl !== 'null') {
            const fileName = imageUrl.split('/').pop();
            await supaClient.storage.from('gallery-images').remove([`public/${fileName}`]);
        }
        loadGalleryItems();
    }
}
