const fs = require('fs');
const path = require('path');

const baseDir = path.join('public', 'images', 'multimedia-galeria');
const folder = path.join(baseDir, 'planton-socha-capacitacion-feb-2025');
const innerFolder = path.join(folder, 'WebP_Convertidas');

if (fs.existsSync(innerFolder)) {
    // 1. Move all files out
    const files = fs.readdirSync(innerFolder).filter(f => !f.startsWith('.'));
    for (const f of files) {
        fs.renameSync(path.join(innerFolder, f), path.join(folder, f));
    }
    // 2. Remove the inner folder
    try { fs.rmdirSync(innerFolder); } catch(e){}
    console.log("Moved files up from WebP_Convertidas");
}

// 3. Rename them nicely
const imageFiles = fs.readdirSync(folder).filter(f => !f.startsWith('.') && fs.statSync(path.join(folder, f)).isFile());
const slug = 'planton-socha-capacitacion-feb-2025';

imageFiles.forEach((file, idx) => {
    const ext = path.extname(file);
    const newFileName = `${slug}-${idx + 1}${ext}`;
    if (file !== newFileName) {
        fs.renameSync(path.join(folder, file), path.join(folder, newFileName));
    }
});
console.log("Renamed planton files successfully.");
