document.addEventListener("DOMContentLoaded", function () {
    fetch("/asset/data/projects.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("projects-container");
            const yearFilter = document.getElementById("year-filter");

            if (data.projects && data.projects.length > 0) {
                // Sort projects by year (latest first)
                data.projects.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));

                // Extract unique years for the filter dropdown
                const years = [...new Set(data.projects.map(project => project.timestamp))];
                years.forEach(year => {
                    const option = document.createElement("option");
                    option.value = year;
                    option.textContent = year;
                    yearFilter.appendChild(option);
                });

                // Function to display projects based on selected year
                function displayProjects(filterYear) {
                    container.innerHTML = ""; // Clear previous projects

                    data.projects.forEach(project => {
                        if (filterYear !== "all" && project.timestamp !== filterYear) {
                            return; // Skip projects that don't match the filter
                        }

                        // Create project-content div
                        const projectContent = document.createElement("div");
                        projectContent.classList.add("project-content");

                        // Year (timestamp)
                        const yearElement = document.createElement("p");
                        yearElement.classList.add("project-content-p");
                        yearElement.textContent = project.timestamp;

                        // Left Section (circle + vertical line)
                        const projectContentLeft = document.createElement("div");
                        projectContentLeft.classList.add("project-content-left");

                        const circle = document.createElement("div");
                        circle.classList.add("project-content-left-circle");

                        const vline = document.createElement("div");
                        vline.classList.add("project-content-left-vline");

                        // Determine colors based on even/odd year
                        const year = parseInt(project.timestamp);
                        if (year % 2 === 0) {
                            circle.style.backgroundColor = "var(--purple)";
                            vline.style.backgroundColor = "var(--purple)";
                        } else {
                            circle.style.backgroundColor = "var(--zard)";
                            vline.style.backgroundColor = "var(--zard)";
                        }

                        projectContentLeft.appendChild(circle);
                        projectContentLeft.appendChild(vline);

                        // Right Section (title, description, and link)
                        const projectContentRight = document.createElement("div");
                        projectContentRight.classList.add("project-content-right");

                        const title = document.createElement("strong");
                        title.textContent = project.title;

                        const description = document.createElement("p");
                        description.textContent = project.description;

                        const link = document.createElement("a");
                        link.href = project.link;
                        link.textContent = project.link;
                        link.target = "_blank";

                        // Append elements to right section
                        projectContentRight.appendChild(title);
                        projectContentRight.appendChild(description);
                        projectContentRight.appendChild(link);

                        // Append all sections to projectContent
                        projectContent.appendChild(yearElement);
                        projectContent.appendChild(projectContentLeft);
                        projectContent.appendChild(projectContentRight);

                        // Append projectContent to projects container
                        container.appendChild(projectContent);
                    });

                    // Ensure vertical lines match content height
                    matchAllVlineHeights();
                }

                // Initialize with all projects
                displayProjects("all");

                // Listen for filter change
                yearFilter.addEventListener("change", function () {
                    displayProjects(this.value);
                });
            }
        })
        .catch(error => console.error("Error loading projects:", error));
});

// Function to match vertical line height dynamically and adjust by -20px
function matchAllVlineHeights() {
    const projectContents = document.querySelectorAll('.project-content');

    projectContents.forEach(project => {
        const rightContent = project.querySelector('.project-content-right');
        const vline = project.querySelector('.project-content-left-vline');

        if (rightContent && vline) {
            let newHeight = rightContent.offsetHeight - 20; // Subtract 20px
            vline.style.height = `${newHeight}px`;
        }
    });
}

// Ensure heights are updated on window resize
window.addEventListener('resize', matchAllVlineHeights);
