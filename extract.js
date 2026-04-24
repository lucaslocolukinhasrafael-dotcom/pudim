const fs = require('fs');
const html = fs.readFileSync('Cardápio de Páscoa 2026.html', 'utf8');

// Find the JSON embedded in window['bootstrap']
const match = html.match(/window\['bootstrap'\] = JSON\.parse\('(.+?)'\);/);
if (match) {
    try {
        // Unescape the string and parse it (Canva uses a weird escaping)
        // Let's just use regex directly on the HTML string to find text segments.
    } catch(e){}
}

const texts = [];
const regex = /"A\?":"A","A":"([^"]+?)\\n"/g;
let m;
while ((m = regex.exec(html)) !== null) {
    if (m[1].trim().length > 1) {
        texts.push(m[1].trim());
    }
}
console.log(texts);
