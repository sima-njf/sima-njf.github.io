if(document.querySelector("header")){
function toggleMenu() {
    const header = document.querySelector("header");
    const overlay = document.querySelector(".overlay");

    if (header.classList.contains("expanded")) {
        header.classList.remove("expanded");
        overlay.classList.remove("show");
    } else {
        header.classList.add("expanded");
        overlay.classList.add("show");
    }
}
}


if(document.querySelector('.information-body-name-h1')){
const nameElement = document.querySelector('.information-body-name-h1');

function typeWriter(element, text, index = 0) {
    if (index < text.length) {
        element.textContent = text.slice(0, index + 1); 
        setTimeout(() => typeWriter(element, text, index + 1), 40); 
    } else {
        element.classList.add('expanded'); 
    }
}

function resetTextAfterDelay(element, originalText, delay = 5000) {
    setTimeout(() => {
        const resetInterval = 20; 
        let currentLength = element.textContent.length;

        const intervalId = setInterval(() => {
            if (currentLength > originalText.length) {
                element.textContent = element.textContent.slice(0, -1); 
                currentLength--;
            } else {
                clearInterval(intervalId); 
                element.textContent = originalText; 
                element.classList.remove('expanded'); 
            }
        }, resetInterval);
    }, delay); 
}


    nameElement.addEventListener('click', () => {
        const fullName = nameElement.getAttribute('data-full-name');
        const originalText = 'Sima-Njf'; 

        typeWriter(nameElement, fullName);

        resetTextAfterDelay(nameElement, originalText, 5000);
    });
}


if(document.querySelector('.information-body')){
    function matchHeight() {
        const informationBody = document.querySelector('.information-body');
        
        if (!informationBody) return;
    
        const rect = informationBody.getBoundingClientRect();
    
        const computedStyle = window.getComputedStyle(informationBody);
    
        const marginTop = parseFloat(computedStyle.marginTop) || 0;
        const marginBottom = parseFloat(computedStyle.marginBottom) || 0;
    
        const totalHeight = rect.height + marginTop + marginBottom;
    
        const viewportHeight = window.innerHeight;
    
        const finalHeight = Math.max(totalHeight, viewportHeight);
    
    
        const headerContainer = document.querySelector('.header-container');
        const PictureContainer = document.querySelector('.picture-container');
        if (headerContainer) {
            headerContainer.style.height = finalHeight + 'px';
            // PictureContainer.style.height = finalHeight + 'px';
        }
    
    
    }
    
    
    window.onload = matchHeight;
    window.onresize = matchHeight;
}




if(document.getElementById("tab-side-menu")){
    function toggleMenu() {
        var menu = document.getElementById("tab-side-menu");
        menu.classList.toggle("show");
    }
}