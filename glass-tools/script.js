document.addEventListener('DOMContentLoaded', () => {
    // Views
    const homeView = document.getElementById('home-view');
    const uploadView = document.getElementById('upload-view');
    const urlView = document.getElementById('url-view');
    const conversionView = document.getElementById('conversion-view');

    // Elements - General
    const cards = document.querySelectorAll('.glass-card');
    const logo = document.querySelector('.logo');

    // Elements - Upload View
    const uploadTitle = document.getElementById('upload-title');
    const btnSelect = document.getElementById('btn-select');
    const fileInput = document.getElementById('file-input');

    // Elements - URL View
    const urlTitle = document.getElementById('url-title');
    const urlInput = document.getElementById('url-input');
    const btnConvertUrl = document.getElementById('btn-convert-url');
    const urlInputContainer = document.getElementById('url-input-container');
    const loadingContainer = document.getElementById('loading-container');
    const resultContainer = document.getElementById('result-container');

    // Elements - Loading & Result
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const loadingStatus = document.querySelector('.loading-status');
    const videoThumbnail = document.getElementById('video-thumbnail');
    const videoTitle = document.getElementById('video-title');
    const videoAuthor = document.getElementById('video-author');
    const btnDownload = document.getElementById('btn-download');
    const btnConvertAnother = document.getElementById('btn-convert-another');

    // Elements - Conversion View
    const btnConvert = document.getElementById('btn-convert');
    const targetFormatSpan = document.getElementById('target-format');

    // State
    let currentTool = '';
    let targetFormat = '';

    // Navigation Function
    function switchView(viewName) {
        // Hide all views
        [homeView, uploadView, urlView, conversionView].forEach(view => {
            if (view) view.classList.remove('active');
        });

        // Reset URL View State when leaving or entering
        if (viewName === 'home' || viewName === 'url') {
            if (urlInputContainer) urlInputContainer.style.display = 'flex';
            if (loadingContainer) loadingContainer.style.display = 'none';
            if (resultContainer) resultContainer.style.display = 'none';
            if (urlInput) urlInput.value = '';
        }

        // Show target view
        if (viewName === 'home' && homeView) homeView.classList.add('active');
        if (viewName === 'upload' && uploadView) uploadView.classList.add('active');
        if (viewName === 'url' && urlView) urlView.classList.add('active');
        if (viewName === 'conversion' && conversionView) conversionView.classList.add('active');
    }

    // Event Listeners

    // 1. Click on Card -> Go to Upload View or URL View
    cards.forEach(card => {
        card.addEventListener('click', () => {
            currentTool = card.getAttribute('data-tool');
            targetFormat = card.getAttribute('data-target');

            if (currentTool.includes('YouTube') || currentTool.includes('TikTok')) {
                // URL Tools
                if (urlTitle) urlTitle.innerText = currentTool;
                switchView('url');
            } else {
                // File Tools
                if (uploadTitle) uploadTitle.innerText = currentTool;
                if (targetFormatSpan) targetFormatSpan.innerText = targetFormat;
                switchView('upload');
            }
        });
    });

    // 2. Click on Select File -> Trigger File Input
    if (btnSelect) {
        btnSelect.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });
    }

    // Handle File Selection
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                // Simulate loading state
                const originalText = btnSelect.innerHTML;
                btnSelect.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span> Loading...';

                setTimeout(() => {
                    switchView('conversion');
                    // Reset button text
                    btnSelect.innerHTML = originalText;
                }, 500);
            }
        });
    }

    // 3. Click on Logo -> Go back home
    if (logo) {
        logo.addEventListener('click', () => {
            switchView('home');
        });
    }

    // 4. Click on Convert (File) -> Simulate conversion
    if (btnConvert) {
        btnConvert.addEventListener('click', () => {
            const originalText = btnConvert.innerHTML;
            btnConvert.innerHTML = 'Converting...';
            btnConvert.style.opacity = '0.7';

            setTimeout(() => {
                alert('Conversion complete! (Simulation)');
                btnConvert.innerHTML = originalText;
                btnConvert.style.opacity = '1';
                switchView('home');
            }, 1500);
        });
    }

    // 5. Click on Convert (URL) -> Simulate conversion
    if (btnConvertUrl) {
        btnConvertUrl.addEventListener('click', () => {
            const url = urlInput.value.trim();
            if (!url) {
                alert('Please enter a valid URL.');
                return;
            }

            // Reset state
            if (progressBar) progressBar.style.width = '0%';
            if (progressText) progressText.innerText = '0%';
            if (loadingStatus) loadingStatus.innerText = 'Analyzing video...';

            // Switch to loading view
            if (urlInputContainer) urlInputContainer.style.display = 'none';
            if (loadingContainer) loadingContainer.style.display = 'flex';
            if (resultContainer) resultContainer.style.display = 'none';

            // Simulate Conversion Process
            let progress = 0;
            const interval = setInterval(() => {
                // Random progress increment
                progress += Math.random() * 15;

                if (progress > 100) progress = 100;

                // Update UI
                if (progressBar) progressBar.style.width = `${progress}%`;
                if (progressText) progressText.innerText = `${Math.round(progress)}%`;

                // Update status text based on progress
                if (loadingStatus) {
                    if (progress > 20 && progress < 50) {
                        loadingStatus.innerText = 'Converting to MP4...';
                    } else if (progress >= 50 && progress < 80) {
                        loadingStatus.innerText = 'Optimizing quality...';
                    } else if (progress >= 80) {
                        loadingStatus.innerText = 'Finalizing...';
                    }
                }

                if (progress === 100) {
                    clearInterval(interval);

                    // Simulate short delay before showing result
                    setTimeout(() => {
                        // Mock Data
                        let videoId = 'dQw4w9WgXcQ'; // Default fallback
                        try {
                            if (url.includes('v=')) {
                                videoId = url.split('v=')[1].split('&')[0];
                            } else if (url.includes('youtu.be/')) {
                                videoId = url.split('youtu.be/')[1].split('?')[0];
                            }
                        } catch (e) {
                            console.log('Could not extract video ID');
                        }

                        if (videoThumbnail) videoThumbnail.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                        if (videoTitle) videoTitle.innerText = "Rick Astley - Never Gonna Give You Up (Official Music Video)";
                        if (videoAuthor) videoAuthor.innerText = "Rick Astley";

                        if (videoId !== 'dQw4w9WgXcQ') {
                            if (videoTitle) videoTitle.innerText = "Converted YouTube Video";
                            if (videoAuthor) videoAuthor.innerText = "YouTube Channel";
                        }

                        // Show Result
                        if (loadingContainer) loadingContainer.style.display = 'none';
                        if (resultContainer) resultContainer.style.display = 'flex';
                    }, 800);
                }
            }, 500);
        });
    }

    // Handle Download
    if (btnDownload) {
        btnDownload.onclick = () => {
            const originalText = btnDownload.innerHTML;
            btnDownload.innerHTML = '<span class="material-symbols-outlined">check</span> Download Started';
            btnDownload.style.background = '#059669';

            setTimeout(() => {
                btnDownload.innerHTML = originalText;
                btnDownload.style.background = '';
            }, 3000);
        };
    }

    // Handle Convert Another
    if (btnConvertAnother) {
        btnConvertAnother.onclick = () => {
            // Reset to input view
            if (resultContainer) resultContainer.style.display = 'none';
            if (urlInputContainer) urlInputContainer.style.display = 'flex';
            if (urlInput) urlInput.value = '';
        };
    }
});
