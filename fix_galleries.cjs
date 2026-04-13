const fs = require('fs');

const targetFile = 'src/lib/galleries.ts';
let content = fs.readFileSync(targetFile, 'utf8');

const slug = 'planton-socha-capacitacion-feb-2025';
const title = 'Plantón contra minería y capacitación';
const numImages = 26;

let imagesArray = [];
for(let i = 1; i <= numImages; i++) {
    imagesArray.push('            {\n                "src": "/images/multimedia-galeria/' + slug + '/' + slug + '-' + i + '.webp",\n                "alt": "' + title + ' - Imagen ' + i + '"\n            }');
}

const imagesStr = "[\n" + imagesArray.join(",\n") + "\n        ]";

// We find the block for planton
const searchPattern = /("id": "planton-socha-capacitacion-feb-2025"[\s\S]*?"images": )\[\]/g;

content = content.replace(searchPattern, '$1' + imagesStr);
fs.writeFileSync(targetFile, content);
console.log("Updated galleries.ts for Planton");
