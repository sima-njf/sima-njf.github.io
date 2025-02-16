document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("activity-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    event.stopPropagation(); 

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
    console.log(issueData);
    try {
      console.log(JSON.stringify(issueData));
      const response = await fetch("https://github-issue-worker.mjpouromid2.workers.dev/", { // Replace with your Worker URL
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(issueData)
      });

      console.log("🔄 Waiting for response...");
      const responseData = await response.json();
      console.log("✅ Cloudflare Worker Response:", responseData);

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
