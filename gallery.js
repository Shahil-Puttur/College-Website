document.addEventListener('DOMContentLoaded', async () => {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;
    
    // Show loading message
    galleryGrid.innerHTML = '<p>Loading images from the gallery...</p>';

    try {
        const { data, error } = await supabase
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
            galleryGrid.innerHTML = ''; // Clear loading message
            data.forEach(item => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <a href="${item.image_url}" target="_blank">
                        <img src="${item.image_url}" alt="${item.caption || 'Gallery Image'}" loading="lazy">
                    </a>
                    ${item.caption ? `<p>${item.caption}</p>` : ''}
                `;
                galleryGrid.appendChild(galleryItem);
            });
        } else {
            galleryGrid.innerHTML = '<p>No images have been added to the gallery yet.</p>';
        }
    } catch(error) {
        console.error("Error loading gallery:", error);
        galleryGrid.innerHTML = '<p>Could not load the gallery due to a connection error.</p>';
    }
});
