const fs = require('fs');

['cardapio.html', 'pascoa.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // 1. Remove the floating WhatsApp button (and its comment)
    // We look for the comment or the anchor tag itself
    content = content.replace(/<!-- Floating WhatsApp Button -->[\s\S]*?<\/a>/, '');
    // Also catch cases where the comment might be slightly different or missing
    content = content.replace(/<a href="index\.html" class="fixed bottom-6 right-6 z-50 bg-\[#25D366\][\s\S]*?<\/a>/, '');

    // 2. Wrap lucide.createIcons() in try/catch to prevent it from crashing the observer
    content = content.replace(/lucide\.createIcons\(\);/g, 'try { lucide.createIcons(); } catch(e) { console.error(\'Lucide failed\', e); }');

    // 3. Ensure the Hero section has 'active' class by default in pascoa.html
    if (file === 'pascoa.html') {
        // Find the hero section and ensure it has reveal active
        // We match by the unique classes/ID of the hero
        content = content.replace(/<section class="(.*?)reveal"/, (match, p1) => {
            if (!p1.includes('active')) {
                return `<section class="${p1}reveal active"`;
            }
            return match;
        });
    }

    fs.writeFileSync(file, content);
});

console.log('Processed files: Removed floating button and fixed pascoa hero visibility.');
