document.addEventListener('DOMContentLoaded', () => {
    // Views
    const homeView = document.getElementById('home-view');
    const uploadView = document.getElementById('upload-view');
    const urlView = document.getElementById('url-view');
    const conversionView = document.getElementById('conversion-view');

    // Elements
    const cards = document.querySelectorAll('.glass-card');
    const logo = document.querySelector('.logo');
    const uploadTitle = document.getElementById('upload-title');
    const urlTitle = document.getElementById('url-title');
    const btnSelect = document.getElementById('btn-select');
    const btnConvert = document.getElementById('btn-convert');
    const btnConvertUrl = document.getElementById('btn-convert-url');
    const urlInput = document.getElementById('url-input');
    const targetFormatSpan = document.getElementById('target-format');

    // State
    let currentTool = '';
    let targetFormat = '';

    // Navigation Function
    function switchView(viewName) {
        // Hide all views
        [homeView, uploadView, urlView, conversionView].forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        if (viewName === 'home') homeView.classList.add('active');
        if (viewName === 'upload') uploadView.classList.add('active');
        if (viewName === 'url') urlView.classList.add('active');
        if (viewName === 'conversion') conversionView.classList.add('active');
    }

    // Event Listeners

    // 1. Click on Card -> Go to Upload View or URL View
    cards.forEach(card => {
        card.addEventListener('click', () => {
            currentTool = card.getAttribute('data-tool');
            targetFormat = card.getAttribute('data-target');

            if (currentTool.includes('YouTube') || currentTool.includes('TikTok')) {
                // URL Tools
                urlTitle.innerText = currentTool;
                urlInput.value = ''; // Reset input
                switchView('url');
            } else {
                // File Tools
                uploadTitle.innerText = currentTool;
                targetFormatSpan.innerText = targetFormat;
                switchView('upload');
            }
        });
    });

    // 2. Click on Select File -> Trigger File Input
    const fileInput = document.getElementById('file-input');

    btnSelect.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle File Selection
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            // Simulate loading state
            btnSelect.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span> Chargement...';

            setTimeout(() => {
                switchView('conversion');
                // Reset button text
                btnSelect.innerHTML = '<span class="material-symbols-outlined">folder_open</span> Sélectionner les fichiers';

                // Optional: Update file list in conversion view with selected files
                // updateFileList(e.target.files); 
            }, 500);
        }
    });

    // 3. Click on Logo -> Go back home
    logo.addEventListener('click', () => {
        switchView('home');
    });

    // 4. Click on Convert (File) -> Simulate conversion
    btnConvert.addEventListener('click', () => {
        const originalText = btnConvert.innerHTML;
        btnConvert.innerHTML = 'Conversion en cours...';
        btnConvert.style.opacity = '0.7';

        setTimeout(() => {
            alert('Conversion terminée ! (Simulation)');
            btnConvert.innerHTML = originalText;
            btnConvert.style.opacity = '1';
            switchView('home');
        }, 1500);
    });

    // 5. Click on Convert (URL) -> Simulate conversion
    btnConvertUrl.addEventListener('click', () => {
        if (!urlInput.value) {
            alert('Veuillez entrer une URL valide.');
            return;
        }

        const originalText = btnConvertUrl.innerHTML;
        btnConvertUrl.innerHTML = 'Traitement...';
        btnConvertUrl.style.opacity = '0.7';

        setTimeout(() => {
            alert('Vidéo téléchargée et convertie ! (Simulation)');
            btnConvertUrl.innerHTML = originalText;
            btnConvertUrl.style.opacity = '1';
            switchView('home');
        }, 2000);
    });
});
