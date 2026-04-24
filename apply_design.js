const fs = require('fs');

function enhanceFile(filename) {
    if (!fs.existsSync(filename)) return;
    let html = fs.readFileSync(filename, 'utf8');

    // 1. Inject new CSS variables and styles
    html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>
    /* Custom Font Assignments */
    body { font-family: 'Montserrat', sans-serif; background-color: #fdfaf6; }
    .font-display { font-family: 'Playfair Display', serif; }
    .font-script { font-family: 'Grand Hotel', cursive; }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #e1924f; border-radius: 3px; }
    
    /* Soft Shadow Utility */
    .shadow-soft { box-shadow: 0 10px 25px -5px rgba(225, 146, 79, 0.15), 0 8px 10px -6px rgba(225, 146, 79, 0.1); }
    
    /* Scroll Reveal */
    .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); filter: blur(4px); }
    .reveal.active { opacity: 1; transform: translateY(0); filter: blur(0); }
    
    /* Glassmorphism Panels */
    .glass-panel {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255,255,255,0.4) 100%);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0 10px 30px rgba(225, 146, 79, 0.05);
    }
    
    /* Background Grid */
    .bg-grid {
        background-size: 40px 40px;
        background-image: linear-gradient(to right, rgba(225, 146, 79, 0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(225, 146, 79, 0.05) 1px, transparent 1px);
        mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
    }
    </style>`);

    // 2. Add Body background structure
    html = html.replace(/<body class="[^"]+">/, `<body class="bg-[#fdfaf6] text-[#4a2c11] antialiased selection:bg-[#bcc83f] selection:text-white overflow-x-hidden relative">
    <div class="fixed inset-0 pointer-events-none -z-10 bg-grid"></div>
    <div class="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#ffe9d6] rounded-full blur-[120px] -z-10 opacity-60"></div>
    <div class="fixed bottom-0 right-0 w-[400px] h-[400px] bg-[#dad999] rounded-full blur-[100px] -z-10 opacity-30"></div>`);

    // 3. Update Navbar
    const oldNav = /<nav class="fixed top-0 left-0 right-0 z-50 px-6 py-3 md:py-4 bg-\[#ffe9d6\]\/95 backdrop-blur-md border-b border-\[#e1924f\]\/20">/;
    const newNav = `<nav class="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[92%] max-w-7xl z-50 transition-all duration-300">
        <div class="glass-panel rounded-full p-2 pl-4 md:pl-6 flex items-center justify-between shadow-soft">`;
    html = html.replace(oldNav, newNav);

    // Update Navbar closing tag mapping correctly
    html = html.replace(/<\/nav>/, '</div>\n    </nav>');

    // Make "Início" button pill shaped inside navbar
    html = html.replace(/<a href="#acasa" class="px-5 py-2 bg-\[#bcc83f\] text-white rounded-full shadow-soft transition-transform hover:-translate-y-0\.5">Início<\/a>/, 
        `<a href="#acasa" class="px-6 py-2.5 bg-[#bcc83f] text-white rounded-full shadow-sm hover:bg-[#aab734] transition-colors">Início</a>`);

    // 4. Enhance Hero Buttons (only in cardapio.html)
    if (filename === 'cardapio.html') {
        const oldHeroBtn1 = /<a href="#pudins" class="w-full md:w-auto flex items-center justify-center gap-3 bg-\[#e1924f\] text-white rounded-full px-8 py-3 shadow-soft hover:-translate-y-1 transition-all">[\s\S]*?<\/a>/;
        const newHeroBtn1 = `<a href="#pudins" class="w-full md:w-auto flex items-center justify-center bg-[#e1924f] text-white rounded-full px-10 py-4 shadow-soft hover:-translate-y-1 transition-all">
                    <span class="font-bold text-sm tracking-[0.2em] uppercase">Ver Pudins</span>
                </a>`;
        html = html.replace(oldHeroBtn1, newHeroBtn1);

        const oldHeroBtn2 = /<a href="#quiches" class="w-full md:w-auto flex items-center justify-center gap-3 bg-\[#dad999\] text-\[#4a2c11\] rounded-full px-8 py-3 shadow-soft hover:-translate-y-1 transition-all">[\s\S]*?<\/a>/;
        const newHeroBtn2 = `<a href="#quiches" class="w-full md:w-auto flex items-center justify-center bg-[#dad999] text-[#4a2c11] rounded-full px-10 py-4 shadow-soft hover:-translate-y-1 transition-all">
                    <span class="font-bold text-sm tracking-[0.2em] uppercase">Ver Quiches</span>
                </a>`;
        html = html.replace(oldHeroBtn2, newHeroBtn2);
    }

    // 5. Update classes for glass panels instead of flat backgrounds
    // This adds the glass-panel class to containers.
    html = html.replace(/bg-\[\#ffe9d6\]\/50/g, 'glass-panel');
    html = html.replace(/bg-white border border-\[\#ffe9d6\]/g, 'glass-panel border-white/50');
    html = html.replace(/bg-white rounded-\[2\.5rem\]/g, 'glass-panel rounded-[2.5rem]');
    html = html.replace(/bg-white rounded-\[2rem\]/g, 'glass-panel rounded-[2rem]');
    html = html.replace(/bg-white border-t border-\[\#e1924f\]\/20/g, 'relative overflow-hidden border-t border-[#e1924f]/20'); // Remove white bg from sections
    html = html.replace(/bg-white\/50/g, 'transparent');
    html = html.replace(/bg-\[\#ffe9d6\] border-t border-\[\#e1924f\]\/20/g, 'relative border-t border-[#e1924f]/20'); // Remove solid background from sections

    // 6. Add reveal class to sections
    html = html.replace(/<section(.*?)class="(.*?)"/g, '<section$1class="$2 reveal"');
    html = html.replace(/<section id="acasa" class="(.*?)"/, '<section id="acasa" class="$1 active"');

    // 7. Intersection Observer script
    const observerScript = `
    <script>
        lucide.createIcons();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
`;
    html = html.replace(/<script>\s*lucide\.createIcons\(\);/, observerScript);

    fs.writeFileSync(filename, html);
    console.log('Enhanced', filename);
}

enhanceFile('cardapio.html');
enhanceFile('pascoa.html');
