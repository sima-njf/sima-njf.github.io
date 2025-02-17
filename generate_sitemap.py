# Sitemap Generator for GitHub Pages (Final Fix)
import os
from datetime import datetime
from xml.etree.ElementTree import Element, SubElement, ElementTree

# Base URL of GitHub Pages site
BASE_URL = "https://sima-njf.github.io"
OUTPUT_FILE = "sitemap.xml"

# List of files to exclude
EXCLUDED_FILES = {"404.html", "sitemap.xml"}

# Create root <urlset> element
urlset = Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")

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
            url_elem = SubElement(urlset, "url")
            SubElement(url_elem, "loc").text = url
            SubElement(url_elem, "lastmod").text = lastmod
            SubElement(url_elem, "priority").text = "0.80"

# Write to sitemap.xml (Ensure proper XML structure)
tree = ElementTree(urlset)
with open(OUTPUT_FILE, "wb") as f:
    tree.write(f, encoding="utf-8", xml_declaration=True)

print(f"Sitemap generated: {OUTPUT_FILE}")
