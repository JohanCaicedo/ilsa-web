const fs = require('fs');
const file = 'd:\\.dev\\ilsa-web\\src\\pages\\nosotros\\index.astro';
let content = fs.readFileSync(file, 'utf8');

// Replace setInterval logic with recursive setTimeout logic
content = content.replace(
    /let currentIndex = 0;\s*setInterval\(\(\) => \{([\s\S]*?)\}, 3000 \+ \(Math\.random\(\) \* 2000\)\);/,
    `let currentIndex = 0;
            const nextSlide = () => {$1    setTimeout(nextSlide, 4000 + (Math.random() * 3000));
            };
            setTimeout(nextSlide, 4000 + (Math.random() * 3000));`
);

fs.writeFileSync(file, content);
console.log('Slider fixed.');
