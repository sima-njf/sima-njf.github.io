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
    .then(response => response.json())
    .then(data => {
        console.log("✅ Parsed JSON data:", data);

        const container = document.getElementById('activities-container');
        const template = document.getElementById('activity-template');

        // ✅ SORT THE DATA BASED ON TIMESTAMP (Only if there are multiple activities)
        if (data.activities.length > 1) {
            data.activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        }

        // ✅ CHECK IF THERE ARE ACTIVITIES TO DISPLAY
        if (data.activities.length === 0) {
            console.warn("⚠️ No activities found in the JSON file.");
            return;
        }

        data.activities.forEach(activity => {
            const activityDiv = template.cloneNode(true);
            activityDiv.id = "";
            activityDiv.style.display = 'flex';

            // FRONT SIDE (Image & Title)
            activityDiv.querySelector('.activity-container-content-holder-academic-container-each-img').src = activity.image;
            activityDiv.querySelector('.activity-container-content-holder-academic-container-each-img').alt = activity.title;
            activityDiv.querySelector('.activity-container-content-holder-academic-container-each-strong').textContent = activity.title;

            // BACK SIDE (Description & Link)
            activityDiv.querySelector('.activity-container-content-holder-academic-container-each-p').textContent = activity.description;
            activityDiv.querySelector('.activity-container-content-holder-academic-container-each-a').href = activity.link;

            // ✅ USE THE DATE FROM JSON WITHOUT MODIFYING IT
            const timestampElement = activityDiv.querySelector('.activity-timestamp');
            timestampElement.textContent = `Posted on: ${activity.timestamp}`;

            // ✅ ADD CLICK EVENT TO FLIP THE CARD
            activityDiv.addEventListener("click", function () {
                this.classList.toggle("flipped");
            });

            container.appendChild(activityDiv);
        });
    })
    .catch(error => console.error('❌ Error fetching activities:', error));
