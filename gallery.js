document.addEventListener('DOMContentLoaded', async () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

    if (data && data.length > 0) {
        galleryGrid.innerHTML = ''; // Clear loading message
        data.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.image_url}" alt="${item.caption || 'Gallery Image'}">
                ${item.caption ? `<p>${item.caption}</p>` : ''}
            `;
            galleryGrid.appendChild(galleryItem);
        });
    } else {
        galleryGrid.innerHTML = '<p>No images have been added to the gallery yet.</p>';
    }
});
