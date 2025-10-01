document.addEventListener('DOMContentLoaded', async () => {
    const noticeContent = document.getElementById('notice-content');
    const urlParams = new URLSearchParams(window.location.search);
    const noticeId = urlParams.get('id');

    if (noticeId) {
        // Fetch and display a single notice
        const { data, error } = await supabase
            .from('notices')
            .select('*')
            .eq('id', noticeId)
            .single();

        if (data) {
            noticeContent.innerHTML = `
                <div class="single-notice-view">
                    ${data.image_url ? `<img src="${data.image_url}" alt="${data.heading}">` : ''}
                    <h2>${data.heading}</h2>
                    <p>${data.description}</p>
                    <a href="notices.html" class="btn-secondary">Back to All Notices</a>
                </div>
            `;
        } else {
            noticeContent.innerHTML = '<p>Notice not found.</p>';
        }
    } else {
        // Fetch and display all notices
        const { data, error } = await supabase
            .from('notices')
            .select('*')
            .order('created_at', { ascending: false });

        if (data && data.length > 0) {
            let noticesHTML = '<div class="notice-list">';
            data.forEach(notice => {
                noticesHTML += `
                    <div class="notice-card">
                        ${notice.image_url ? `<img src="${notice.image_url}" alt="${notice.heading}">` : ''}
                        <h2>${notice.heading}</h2>
                        <p>${notice.description.substring(0, 150)}...</p>
                        <a href="notices.html?id=${notice.id}" class="btn-secondary">Read More</a>
                    </div>
                `;
            });
            noticesHTML += '</div>';
            noticeContent.innerHTML += noticesHTML;
            // Remove initial "loading" message
            noticeContent.querySelector('p').remove(); 
        } else {
            noticeContent.innerHTML += '<p>No notices have been posted yet.</p>';
        }
    }
});
