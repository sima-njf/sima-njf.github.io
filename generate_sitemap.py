# Sitemap Generator for GitHub Pages (Fixed XML Declaration Issue)
import os
from datetime import datetime
from xml.dom.minidom import Document

# Base URL of GitHub Pages site
BASE_URL = "https://sima-njf.github.io"
OUTPUT_FILE = "sitemap.xml"

# List of files to exclude
EXCLUDED_FILES = {"404.html", "sitemap.xml", "pages/activity/activityform.html"}

# Create XML Document
doc = Document()

# Create root <urlset> element
urlset = doc.createElement("urlset")
urlset.setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
doc.appendChild(urlset)

# Walk through files and generate sitemap entries
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(('.html', '.pdf')) and not file.startswith('.'):
            path = os.path.join(root, file).replace("./", "").replace("\\", "/")

            # Skip excluded files
            if path in EXCLUDED_FILES:
                continue

            # Generate absolute URL
            url = f"{BASE_URL}/{path}".replace("/./", "/")

            # Get last modified date (YYYY-MM-DD format)
            lastmod = datetime.fromtimestamp(os.path.getmtime(os.path.join(root, file))).strftime('%Y-%m-%d')

            # Create XML nodes
            url_elem = doc.createElement("url")
            loc_elem = doc.createElement("loc")
            loc_elem.appendChild(doc.createTextNode(url))
            lastmod_elem = doc.createElement("lastmod")
            lastmod_elem.appendChild(doc.createTextNode(lastmod))
            priority_elem = doc.createElement("priority")
            priority_elem.appendChild(doc.createTextNode("0.80"))

            # Add nodes to URL element
            url_elem.appendChild(loc_elem)
            url_elem.appendChild(lastmod_elem)
            url_elem.appendChild(priority_elem)
            urlset.appendChild(url_elem)

# Write to sitemap.xml (Properly Handling XML Declaration)
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(doc.toprettyxml(indent="  ", encoding="UTF-8").decode("utf-8"))

print(f"Sitemap generated: {OUTPUT_FILE}")
