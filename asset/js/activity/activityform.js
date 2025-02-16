document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("activity-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    event.stopPropagation();

    console.log("✅ Form submission started");

    const title = document.getElementById("title").value.trim();
    const image = document.getElementById("image").value.trim();
    const description = document.getElementById("description").value.trim();
    const link = document.getElementById("link").value.trim();

    // ✅ Debugging - Ensure values are captured
    console.log("📌 Title:", title);
    console.log("📌 Image URL:", image);
    console.log("📌 Description:", description);
    console.log("📌 Link:", link);

    if (!title || !image || !description || !link) {
      console.error("❌ ERROR: Missing required fields!");
      alert("Please fill in all fields before submitting.");
      return;
    }

    const issueData = {
      title: title,
      image: image,
      description: description,
      link: link
    };

    try {
      console.log("🚀 Sending data:", JSON.stringify(issueData));

      const response = await fetch("https://github-issue-worker.mjpouromid2.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(issueData)
      });

      console.log("🔄 Waiting for response...");
      const responseText = await response.text();
      console.log("✅ Cloudflare Worker Response:", responseText);

      if (response.ok) {
        alert("🎉 Activity submitted successfully!");
        form.reset();
      } else {
        alert(`⚠️ Failed to submit activity: ${responseText}`);
      }
    } catch (error) {
      console.error("❌ Error submitting activity:", error);
      alert("❌ An error occurred. Check the console for details.");
    }
  });
});
