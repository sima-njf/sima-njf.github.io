document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("activity-form");
  
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      event.stopPropagation(); // Ensure no default action occurs
  
      console.log("✅ Form submission started");
  
      const title = document.getElementById("title").value;
      const image = document.getElementById("image").value;
      const description = document.getElementById("description").value;
      const link = document.getElementById("link").value;
  
      console.log("📌 Title:", title);
      console.log("📌 Image URL:", image);
      console.log("📌 Description:", description);
      console.log("📌 Link:", link);
  
      const issueData = {
        title: title,
        body: `**Image:** ${image}\n\n**Description:** ${description}\n\n**Link:** ${link}`
      };
  
      try {
        console.log("🚀 Sending POST request to GitHub Issues API...");
        const response = await fetch("https://api.github.com/repos/sima-njf/sima-njf.github.io/issues", {
          method: "POST",
          headers: {
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json",
            "Authorization": `token PERSONAL_ACCESS_TOKEN` // Replace this with the actual token value
          },
          body: JSON.stringify(issueData)
        });
  
        console.log("🔄 Waiting for response...");
        const responseData = await response.json();
        console.log("✅ GitHub API Response:", responseData);
  
        if (response.ok) {
          alert("🎉 Activity submitted successfully!");
          form.reset();
        } else {
          alert(`⚠️ Failed to submit activity: ${responseData.message}`);
        }
      } catch (error) {
        console.error("❌ Error submitting activity:", error);
        alert("❌ An error occurred. Check the console for details.");
      }
    });
  });
  