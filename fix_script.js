const fs = require('fs');

['cardapio.html', 'pascoa.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // The broken code is `mobileMenu.innerHTML = \``, we need to make it `mobileMenu.innerHTML = \`` without the slash
    content = content.replace(/mobileMenu\.innerHTML = \\`/g, 'mobileMenu.innerHTML = `');
    
    // Also, pascoa.html needs its header updated to the new pill design
    if (file === 'pascoa.html') {
        const newNav = `<nav class="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[92%] max-w-7xl z-50 transition-all duration-300">
        <div class="glass-panel rounded-full p-2 pl-4 md:pl-6 flex items-center justify-between shadow-soft">
            <!-- Logo -->
            <a href="index.html" class="flex items-center group">
                <svg viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-32 h-12 md:w-40 md:h-14 transition-transform group-hover:scale-105">
                    <ellipse cx="50" cy="70" rx="30" ry="8" fill="#dad999"/>
                    <path d="M30 65 Q 50 75 70 65 L 62 35 Q 50 30 38 35 Z" fill="#ffe9d6"/>
                    <path d="M38 35 Q 50 45 62 35 Q 50 30 38 35 Z" fill="#e1924f"/>
                    <path d="M 38 35 L 38 50 Q 43 55 45 50 L 45 38" fill="#e1924f"/>
                    <path d="M 55 37 L 55 55 Q 60 60 62 55 L 62 35" fill="#e1924f"/>
                    <text x="90" y="55" font-family="'Grand Hotel', cursive" font-size="48" fill="#e1924f">Jardim</text>
                    <text x="135" y="80" font-family="'Montserrat', sans-serif" font-weight="600" font-size="20" fill="#9d591f" letter-spacing="2">DOS PUDINS</text>
                </svg>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden lg:flex items-center gap-6 font-medium text-sm text-[#9d591f]">
                <a href="cardapio.html" class="hover:text-[#e1924f] transition-colors">Cardápio Geral</a>
                <a href="#ovos" class="hover:text-[#e1924f] transition-colors">Ovos</a>
                <a href="#pudins" class="hover:text-[#e1924f] transition-colors">Pudins Especiais</a>
                <a href="#kits" class="hover:text-[#e1924f] transition-colors">Kits</a>
                <a href="index.html" class="px-6 py-2.5 bg-[#bcc83f] text-white rounded-full shadow-sm hover:bg-[#aab734] transition-colors">Voltar</a>
            </div>

            <!-- Mobile Menu Toggle -->
            <button class="lg:hidden p-2 text-[#e1924f] mr-4">
                <i data-lucide="menu" class="w-8 h-8"></i>
            </button>
        </div>
    </nav>`;
        // Replace old nav logic
        const oldNavStart = content.indexOf('<nav class="fixed');
        if (oldNavStart !== -1) {
            const oldNavEnd = content.indexOf('</nav>', oldNavStart) + 6;
            content = content.slice(0, oldNavStart) + newNav + content.slice(oldNavEnd);
        }

        // Also fix the `\`` in pascoa mobileMenu HTML template closing backtick if needed
        content = content.replace(/\\`/g, '`');
    } else {
        content = content.replace(/\\`/g, '`');
    }

    fs.writeFileSync(file, content);
});
console.log('Fixed syntax errors and navbars');
