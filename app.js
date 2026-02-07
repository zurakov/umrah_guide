// Current language
let currentLang = 'en';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0];
    currentLang = ['en', 'id', 'ru'].includes(browserLang) ? browserLang : 'en';

    // Render initial content
    render(currentLang);

    // Setup language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang !== currentLang) {
                currentLang = lang;
                render(lang);

                // Update button states
                document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // Set initial active button
    document.querySelector(`[data-lang="${currentLang}"]`).classList.add('active');
    document.querySelector('[data-lang="en"]').classList.remove('active');
    document.querySelector(`[data-lang="${currentLang}"]`).classList.add('active');
});

// Render content
function render(lang) {
    const data = translations[lang];
    const app = document.getElementById('app');
    const footer = document.getElementById('footer');

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
                ${section.number ? `<div class="step-number">${section.number}</div>` : ''}
                <h2>${section.title}</h2>
                <div class="section-content">
        `;

        section.elements.forEach(el => {
            switch (el.type) {
                case 'hr':
                    html += '<hr>';
                    break;
                case 'callout':
                    html += `<div class="callout ${el.style}">${el.content}</div>`;
                    break;
                case 'arabic':
                    html += `<div class="arabic-block">${el.content}</div>`;
                    break;
                case 'h3':
                    html += `<h3>${el.content}</h3>`;
                    break;
                case 'h4':
                    html += `<h4>${el.content}</h4>`;
                    break;
                case 'p':
                    html += `<p>${el.content}</p>`;
                    break;
                case 'ul':
                    html += `<ul>${el.content}</ul>`;
                    break;
                case 'ol':
                    html += `<ol>${el.content}</ol>`;
                    break;
                default:
                    html += `<${el.type}>${el.content}</${el.type}>`;
            }
        });

        html += `
                </div>
            </div>
        `;
    });

    app.innerHTML = html;

    // Render footer
    footer.innerHTML = `
        <div class="arabic">${data.footer.arabic}</div>
        <div class="blessing">${data.footer.blessing}</div>
        <div class="meaning">${data.footer.meaning}</div>
    `;
}
