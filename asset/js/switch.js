// script.js

// Get the toggle switch and body element
const nightModeToggle = document.getElementById('nightModeToggle');
const body = document.body;

// Function to toggle night mode
function toggleNightMode() {
    if (body.classList.contains('night-mode')) {
        body.classList.remove('night-mode'); // Remove night mode
        localStorage.setItem('nightMode', 'off'); // Save preference
    } else {
        body.classList.add('night-mode'); // Add night mode
        localStorage.setItem('nightMode', 'on'); // Save preference
    }
}

// Apply night mode based on local storage when the page loads
function applyNightModeFromStorage() {
    const savedNightMode = localStorage.getItem('nightMode');
    if (savedNightMode === 'on') {
        body.classList.add('night-mode');
        nightModeToggle.checked = true; // Set the toggle to "on"
    } else {
        body.classList.remove('night-mode');
        nightModeToggle.checked = false; // Set the toggle to "off"
    }
}

// Event listener for the toggle switch
nightModeToggle.addEventListener('change', toggleNightMode);


applyNightModeFromStorage();




if (document.getElementById('captchaBox')){
    const captchaBox = document.getElementById('captchaBox');

    const captchaText = document.getElementById('captchaText');

    captchaBox.addEventListener('click', function () {
        captchaBox.classList.add('verified');

        captchaText.textContent = 'Confirmed Human';
    });
}

if (document.getElementById('captchaBoxTablet')){
    const captchaBoxTablet = document.getElementById('captchaBoxTablet');

    const captchaTextTablet = document.getElementById('captchaTextTablet');

    captchaBoxTablet.addEventListener('click', function () {
        captchaBoxTablet.classList.add('verified');

        captchaTextTablet.textContent = 'Confirmed Human';
    });
}