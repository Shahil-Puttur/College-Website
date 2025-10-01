document.addEventListener('DOMContentLoaded', async () => {
    const noticeContent = document.getElementById('notice-content');
    if (!noticeContent) return;

    // Check URL for a specific notice ID
    const urlParams = new URLSearchParams(window.location.search);
    const noticeId = urlParams.get('id');

    // Show loading message
    noticeContent.innerHTML = '<p>Loading notices...</p>';

    try {
        if (noticeId) {
            // --- SINGLE NOTICE VIEW ---
            const { data, error } = await supabase
                .from('notices')
                .select('*')
                .eq('id', noticeId)
                .single();

            if (error) throw error;

            if (data) {
                noticeContent.innerHTML = `
                    <div class="single-notice-view">
                        <h1 class="section-title">${data.heading}</h1>
                        ${data.image_url ? `<img src="${data.image_url}" alt="${data.heading}" style="width: 100%; border-radius: 15px; margin-bottom: 2rem;">` : ''}
                        <p style="white-space: pre-wrap; line-height: 1.8;">${data.description}</p>
                        <a href="notices.html" class="btn-secondary">← Back to All Notices</a>
                    </div>
                `;
            } else {
                noticeContent.innerHTML = '<p>Notice not found.</p>';
            }
        } else {
            // --- ALL NOTICES LIST VIEW ---
            const { data, error } = await supabase
                .from('notices')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data && data.length > 0) {
                let noticesHTML = '<h1 class="section-title">Notices</h1><div class="notice-list">';
                data.forEach(notice => {
                    // Truncate description for the list view
                    const shortDescription = notice.description.length > 150 
                        ? notice.description.substring(0, 150) + '...' 
                        : notice.description;

                    noticesHTML += `
                        <div class="notice-card">
                            ${notice.image_url ? `<img src="${notice.image_url}" alt="${notice.heading}">` : ''}
                            <h2>${notice.heading}</h2>
                            <p>${shortDescription}</p>
                            <a href="notices.html?id=${notice.id}" class="btn-secondary">Read More →</a>
                        </div>
                    `;
                });
                noticesHTML += '</div>';
                noticeContent.innerHTML = noticesHTML;
            } else {
                noticeContent.innerHTML = '<h1 class="section-title">Notices</h1><p>No notices have been posted yet.</p>';
            }
        }
    } catch (error) {
        console.error("Error loading notices:", error);
        noticeContent.innerHTML = '<h1 class="section-title">Notices</h1><p>Could not load notices due to a connection error.</p>';
    }
});
