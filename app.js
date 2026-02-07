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
    const sideNav = document.getElementById('side-nav');

    // Fade out
    container.style.opacity = '0';

    setTimeout(() => {
        let contentHtml = `
            <div class="hero">
                <h1>${data.title}</h1>
            </div>
            <div class="bismillah-card" id="bismillah">
                <div class="arabic">${data.bismillah.arabic}</div>
                <div class="transliteration">${data.bismillah.transliteration}</div>
                <div class="meaning">${data.bismillah.meaning}</div>
            </div>
        `;

        let navHtml = `
            <div class="nav-title">${lang === 'ru' ? 'Навигация' : (lang === 'id' ? 'Navigasi' : 'Navigation')}</div>
            <ul class="nav-links">
                <li><a href="#bismillah" class="nav-link">Bismillah</a></li>
        `;

        data.sections.forEach((section, index) => {
            const sectionId = `section-${index}`;

            navHtml += `
                <li><a href="#${sectionId}" class="nav-link">${section.number ? section.number + '. ' : ''}${section.title}</a></li>
            `;

            contentHtml += `
                <div class="section-card" id="${sectionId}">
                    ${section.number ? `<div class="step-indicator">${section.number}</div>` : ''}
                    <h2>${section.title}</h2>
                    <div class="section-elements">
            `;

            section.elements.forEach(el => {
                if (el.type === 'hr') {
                    contentHtml += '<hr>';
                } else if (el.type === 'callout') {
                    contentHtml += `
                        <div class="callout ${el.style}">
                            ${el.content}
                        </div>
                    `;
                } else if (el.type === 'arabic') {
                    contentHtml += `
                        <div class="arabic-inline">
                            ${el.content}
                        </div>
                    `;
                } else {
                    contentHtml += `<${el.type}>${el.content}</${el.type}>`;
                }
            });

            contentHtml += `
                    </div>
                </div>
            `;
        });

        navHtml += '</ul>';
        sideNav.innerHTML = navHtml;
        container.innerHTML = contentHtml;

        // Update footer
        const footer = document.getElementById('footer-content');
        footer.innerHTML = `
            <div class="footer-arabic">${data.footer.arabic}</div>
            <p class="footer-blessing">${data.footer.blessing}</p>
            <p class="footer-meaning">${data.footer.meaning}</p>
        `;

        // Re-attach scroll listeners or observers if needed
        setupScrollObservers();

        // Fade in
        container.style.opacity = '1';
    }, 300);
}

function setupScrollObservers() {
    const sections = document.querySelectorAll('.section-card, .bismillah-card');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Global Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Default language logic
    const userLang = navigator.language.split('-')[0];
    const defaultLang = ['en', 'id', 'ru'].includes(userLang) ? userLang : 'en';
    switchLang(defaultLang);

    // Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sideNav = document.getElementById('side-nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        sideNav.classList.toggle('open');
    });

    // Close menu when clicking a link
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            menuToggle.classList.remove('open');
            sideNav.classList.remove('open');
        }
    });

    // Back toTop
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
