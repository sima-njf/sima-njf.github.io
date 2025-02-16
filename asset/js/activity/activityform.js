document.getElementById('activity-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  console.log("Form submitted!");

  const title = document.getElementById('title').value;
  const image = document.getElementById('image').value;
  const description = document.getElementById('description').value;
  const link = document.getElementById('link').value;

  console.log("Title:", title);
  console.log("Image URL:", image);
  console.log("Description:", description);
  console.log("Link:", link);

  // Create a discussion post instead of an issue
  const discussionURL = `https://github.com/sima-njf/sima-njf.github.io/discussions/new?category=activities&title=${encodeURIComponent(title)}&body=${encodeURIComponent(`**Image:** ${image}\n\n**Description:** ${description}\n\n**Link:** ${link}`)}`;

  // Redirect user to GitHub discussions
  window.open(discussionURL, '_blank');
});
