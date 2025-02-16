document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img.lazy");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

fetch('/asset/data/activities.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Read response as text first for debugging
    })
    .then(text => {
        console.log("🔍 Raw JSON content:", text); // Log raw JSON content

        if (!text.trim()) {
            throw new Error("❌ JSON file is empty!");
        }

        return JSON.parse(text); // Convert to JSON
    })
    .then(data => {
        console.log("✅ Parsed JSON data:", data);

        if (!data.activities || data.activities.length === 0) {
            throw new Error("❌ No activities found in JSON!");
        }

        const container = document.getElementById('activities-container');
        const template = document.getElementById('activity-template');

        data.activities.forEach(activity => {
            const activityDiv = template.cloneNode(true);
            activityDiv.style.display = 'block';

            activityDiv.querySelector('.activity-container-content-holder-academic-container-each-img').src = activity.image;
            activityDiv.querySelector('.activity-container-content-holder-academic-container-each-img').alt = activity.title;
            activityDiv.querySelector('.activity-container-content-holder-academic-container-each-strong').textContent = activity.title;
            activityDiv.querySelector('.activity-container-content-holder-academic-container-each-p').textContent = activity.description;
            activityDiv.querySelector('.activity-container-content-holder-academic-container-each-a').href = activity.link;

            // Format and display timestamp
            const timestampElement = activityDiv.querySelector('.activity-timestamp');
            const formattedDate = new Date(activity.timestamp).toLocaleString();
            timestampElement.textContent = `Posted on: ${formattedDate}`;

            container.appendChild(activityDiv);
        });
    })
    .catch(error => console.error('❌ Error fetching activities:', error));

