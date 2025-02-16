document.getElementById('activity-form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent page refresh
  console.log("Form submitted!"); // Debugging log

  const title = document.getElementById('title').value;
  const image = document.getElementById('image').value;
  const description = document.getElementById('description').value;
  const link = document.getElementById('link').value;

  console.log("Title:", title);
  console.log("Image URL:", image);
  console.log("Description:", description);
  console.log("Link:", link);

  const issueData = {
    title: title,
    body: `**Image:** ${image}\n\n**Description:** ${description}\n\n**Link:** ${link}`
  };

  try {
    const response = await fetch('https://github-issue-worker.mjpouromid2.workers.dev', { // Replace with your worker URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(issueData)
    });

    const responseData = await response.json();
    console.log("GitHub API Response:", responseData); // Log API response for debugging

    if (response.ok) {
      alert('Activity submitted successfully!');
      document.getElementById('activity-form').reset();
    } else {
      alert(`Failed to submit activity: ${responseData.message}`);
    }
  } catch (error) {
    console.error('Error submitting activity:', error);
    alert('An error occurred. Check the console for details.');
  }
});
