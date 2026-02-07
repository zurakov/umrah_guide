function switchLang(lang) {
    // Update buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(lang)) {
            btn.classList.add('active');
        }
    });

    // Update content
    renderContent(lang);
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderContent(lang) {
    const data = translations[lang];
    const container = document.getElementById('content');
    
    // Fade out
    container.style.opacity = '0';
    
    setTimeout(() => {
        let html = `
            <div class="hero">
                <h1>${data.title}</h1>
            </div>
            <div class="bismillah-card">
                <div class="arabic">${data.bismillah.arabic}</div>
                <div class="transliteration">${data.bismillah.transliteration}</div>
                <div class="meaning">${data.bismillah.meaning}</div>
            </div>
        `;

        data.sections.forEach(section => {
            html += `
                <div class="section-card">
                    ${section.number ? `<div class="step-indicator">${section.number}</div>` : ''}
                    <h2>${section.title}</h2>
                    <div class="section-elements">
            `;
            
            section.elements.forEach(el => {
                if (el.type === 'hr') {
                    html += '<hr>';
                } else if (el.type === 'callout') {
                    html += `
                        <div class="callout ${el.style}">
                            ${el.content}
                        </div>
                    `;
                } else if (el.type === 'arabic') {
                    html += `
                        <div class="arabic" style="font-size: 1.8rem; margin: 20px 0;">
                            ${el.content}
                        </div>
                    `;
                } else {
                    html += `<${el.type}>${el.content}</${el.type}>`;
                }
            });

            html += `
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        
        // Update footer
        const footer = document.getElementById('footer-content');
        footer.innerHTML = `
            <div class="footer-arabic">${data.footer.arabic}</div>
            <p style="font-size: 1.2rem; color: var(--primary); font-weight: 700;">${data.footer.blessing}</p>
            <p style="margin-top: 10px; color: var(--text-muted); font-style: italic;">${data.footer.meaning}</p>
        `;

        // Fade in
        container.style.opacity = '1';
    }, 300);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    // Default to English or browser language
    const userLang = navigator.language.split('-')[0];
    const defaultLang = ['en', 'id', 'ru'].includes(userLang) ? userLang : 'en';
    switchLang(defaultLang);
});
