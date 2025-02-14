#sitemap generator
import os
from datetime import datetime
from xml.dom.minidom import Document

base_url = "https://sima-njf.github.io"


output_file = "sitemap.xml"


doc = Document()
urlset = doc.createElement("urlset")
urlset.setAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
doc.appendChild(urlset)

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(('.html', '.pdf')) and not file.startswith('.'):
            path = os.path.join(root, file).replace("./", "")
            url = base_url + "/" + path.replace("\\", "/")  
            lastmod = datetime.fromtimestamp(os.path.getmtime(os.path.join(root, file))).strftime('%Y-%m-%dT%H:%M:%S+00:00')

            url_elem = doc.createElement("url")
            loc_elem = doc.createElement("loc")
            loc_elem.appendChild(doc.createTextNode(url))
            lastmod_elem = doc.createElement("lastmod")
            lastmod_elem.appendChild(doc.createTextNode(lastmod))
            priority_elem = doc.createElement("priority")
            priority_elem.appendChild(doc.createTextNode("0.80"))  

            url_elem.appendChild(loc_elem)
            url_elem.appendChild(lastmod_elem)
            url_elem.appendChild(priority_elem)
            urlset.appendChild(url_elem)

with open(output_file, "w", encoding="utf-8") as f:
    f.write(doc.toprettyxml(indent="  "))
