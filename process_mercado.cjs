const fs = require('fs');
const path = require('path');

const baseDir = path.join('public', 'images', 'multimedia-galeria');
const oldFolderName = "Cuarto mercado campesino - Sep 1  2005";
const slug = "mercado-campesino-sep-2005";
const title = "Cuarto Mercado Campesino";
const date = "Septiembre 2005";
const location = "Bogotá";

const oldFolderPath = path.join(baseDir, oldFolderName);
const newFolderPath = path.join(baseDir, slug);

if (fs.existsSync(oldFolderPath)) {
    fs.renameSync(oldFolderPath, newFolderPath);
    console.log(`Renamed folder to: ${slug}`);
}

const images = fs.readdirSync(newFolderPath).filter(f => !f.startsWith('.') && fs.statSync(path.join(newFolderPath, f)).isFile());
const albumImages = [];

images.forEach((file, idx) => {
    const ext = path.extname(file);
    const newFileName = `${slug}-${idx + 1}${ext}`;
    const oldFilePath = path.join(newFolderPath, file);
    const newFilePath = path.join(newFolderPath, newFileName);
    
    fs.renameSync(oldFilePath, newFilePath);
    albumImages.push({
        src: `/images/multimedia-galeria/${slug}/${newFileName}`,
        alt: `${title} - Imagen ${idx + 1}`
    });
});

const targetFile = 'src/lib/galleries.ts';
let content = fs.readFileSync(targetFile, 'utf8');

const newAlbum = {
    id: slug,
    title: title,
    location: location,
    date: date,
    images: albumImages
};

// Insert into the albums array of the "eventos-recientes" category
const albumsMatch = content.match(/id: "eventos-recientes"[\s\S]*?albums: \[([\s\S]*?)\]/);
if (albumsMatch) {
    const currentAlbums = albumsMatch[1].trim();
    const separator = currentAlbums ? ",\n" : "";
    const updatedAlbums = currentAlbums + separator + JSON.stringify(newAlbum, null, 12).replace(/^/gm, '    ').trim();
    
    // This part is tricky due to nested structure, let's use a more robust approach
    // We'll replace the whole albums array content
}

// Fallback: overwrite the whole list if regex is too messy
// Actually, let's just append it to the end of the albums array for that category
const insertionPoint = content.indexOf(']', content.indexOf('albums: ['));
// No, that's brittle. Let's just parse the whole thing and rewrite it if needed, 
// or use a simpler marker.

// Better way: find the last album closing and insert before it.
// The structure is categories -> albums -> images.
// Let's use the same logic as before but more targeted.

// Let's read the current file, find where "albums: [" starts for "eventos-recientes", 
// then find the corresponding closing "]" and insert before it.

const startToken = 'id: "eventos-recientes",';
const albumsToken = 'albums: [';

let startIndex = content.indexOf(startToken);
if (startIndex !== -1) {
    let albumsIndex = content.indexOf(albumsToken, startIndex);
    if (albumsIndex !== -1) {
        let openBrackets = 0;
        let endIndex = -1;
        for (let i = albumsIndex + albumsToken.length - 1; i < content.length; i++) {
            if (content[i] === '[') openBrackets++;
            if (content[i] === ']') {
                openBrackets--;
                if (openBrackets === 0) {
                    endIndex = i;
                    break;
                }
            }
        }
        
        if (endIndex !== -1) {
            const albumJson = JSON.stringify(newAlbum, null, 12);
            // Fix indentation
            const indentedAlbum = albumJson.split('\n').map(line => '            ' + line.trim()).join('\n').trim();
            
            const before = content.substring(0, endIndex);
            const after = content.substring(endIndex);
            
            // Check if there are already albums to add a comma
            const currentContentInside = content.substring(albumsIndex + albumsToken.length, endIndex).trim();
            const comma = currentContentInside ? "," : "";
            
            content = before + (comma ? "," : "") + "\n            " + indentedAlbum + "\n        " + after;
            fs.writeFileSync(targetFile, content);
            console.log("Updated galleries.ts with new album");
        }
    }
}
