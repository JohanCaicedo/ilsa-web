// Interfaz para gestionar ambas imágenes
export interface ColumnistImageConfig {
    profile: string; // La foto del columnista
    cover: string;   // La imagen "artística" o fija de portada
}

export const columnistImages: Record<string, ColumnistImageConfig> = {
    "freddy-ordonez-gomez": {
        profile: "https://api.ilsa.org.co/wp-content/uploads/2022/08/Freddy-Recorte-scaled.jpg.webp",
        cover: "https://api.ilsa.org.co/wp-content/uploads/2023/06/FO-O.jpg" // Abstract pattern
    },
    "boaventura-de-sousa-santos": {
        profile: "https://api.ilsa.org.co/wp-content/uploads/2021/11/boaventura.jpg",
        cover: "https://api.ilsa.org.co/wp-content/uploads/2023/06/BASS-O.jpg"
    },
    "carlos-frederico-mares": {
        profile: "https://api.ilsa.org.co/wp-content/uploads/2023/02/Carlos-Frederico-Mares.jpg.webp",
        cover: "https://api.ilsa.org.co/wp-content/uploads/2023/06/CFM-O.jpg"
    },
    "consuelo-quattrocchi": {
        profile: "https://api.ilsa.org.co/wp-content/uploads/2022/08/Consuelo-1-1024x1024.jpg.webp",
        cover: "https://api.ilsa.org.co/wp-content/uploads/2023/06/CQ-O.jpg"
    },
    "german-burgos": {
        profile: "https://api.ilsa.org.co/wp-content/uploads/2026/01/german-burgos-200x200-scale.jpg",
        cover: "https://api.ilsa.org.co/wp-content/uploads/2023/06/GBS-O.jpg"
    },
    "liliana-estupinan-achury": {
        profile: "https://api.ilsa.org.co/wp-content/uploads/2021/12/Liliana-01.jpg",
        cover: "https://api.ilsa.org.co/wp-content/uploads/2023/06/LEA-O.jpg"
    },
    "mauricio-chamorro-rosero": {
        profile: "https://api.ilsa.org.co/wp-content/uploads/2024/12/Chamorro.jpg.webp",
        cover: "https://api.ilsa.org.co/wp-content/uploads/2025/01/Mauricio-Chamorro-IO-01.webp"
    }
};

export const defaultColumnistImage: ColumnistImageConfig = {
    profile: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
};
