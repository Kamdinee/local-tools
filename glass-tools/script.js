document.addEventListener('DOMContentLoaded', () => {
    // Views
    const homeView = document.getElementById('home-view');
    const uploadView = document.getElementById('upload-view');
    const conversionView = document.getElementById('conversion-view');

    // Elements
    const cards = document.querySelectorAll('.glass-card');
    const logo = document.querySelector('.logo');
    const uploadTitle = document.getElementById('upload-title');
    const btnSelect = document.getElementById('btn-select');
    const btnConvert = document.getElementById('btn-convert');
    const targetFormatSpan = document.getElementById('target-format');

    // State
    let currentTool = '';
    let targetFormat = '';

    // Navigation Function
    function switchView(viewName) {
        // Hide all views
        [homeView, uploadView, conversionView].forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        if (viewName === 'home') homeView.classList.add('active');
        if (viewName === 'upload') uploadView.classList.add('active');
        if (viewName === 'conversion') conversionView.classList.add('active');
    }

    // Event Listeners

    // 1. Click on Card -> Go to Upload View
    cards.forEach(card => {
        card.addEventListener('click', () => {
            currentTool = card.getAttribute('data-tool');
            targetFormat = card.getAttribute('data-target');

            // Update UI
            uploadTitle.innerText = currentTool;
            targetFormatSpan.innerText = targetFormat;

            switchView('upload');
        });
    });

    // 2. Click on Select File -> Go to Conversion View (Simulated)
    btnSelect.addEventListener('click', () => {
        // Simulate file selection delay
        btnSelect.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span> Chargement...';

        setTimeout(() => {
            switchView('conversion');
            btnSelect.innerHTML = '<span class="material-symbols-outlined">folder_open</span> Sélectionner les fichiers';
        }, 800);
    });

    // 3. Click on Logo -> Go back home
    logo.addEventListener('click', () => {
        switchView('home');
    });

    // 4. Click on Convert -> Simulate conversion
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
});
