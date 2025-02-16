document.getElementById('activity-form').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent page refresh

  const title = document.getElementById('title').value;
  const image = document.getElementById('image').value;
  const description = document.getElementById('description').value;
  const link = document.getElementById('link').value;

  const issueData = {
    title: title,
    body: `**Image:** ${image}\n\n**Description:** ${description}\n\n**Link:** ${link}`
  };

  try {
    const response = await fetch('https://api.github.com/repos/sima-njf/sima-njf.github.io/issues', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Authorization': `token ${PERSONAL_ACCESS_TOKEN}` // 🔹 ADD THIS
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
