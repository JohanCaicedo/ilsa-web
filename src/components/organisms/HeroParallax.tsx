const sceneLayers = [
    "/images/Paramilitarismo%20en%20el%20siglo%20XXI/Paramilitarismo%20del%20siglo%20XXI%20-%20Hero%20-1.webp",
    "/images/Paramilitarismo%20en%20el%20siglo%20XXI/Paramilitarismo%20del%20siglo%20XXI%20-%20Hero%20-2.webp",
    "/images/Paramilitarismo%20en%20el%20siglo%20XXI/Paramilitarismo%20del%20siglo%20XXI%20-%20Hero%20-3.webp",
];

const foreground = "/images/Paramilitarismo%20en%20el%20siglo%20XXI/Paramilitarismo%20del%20siglo%20XXI%20-%20Hero%20-4.webp";

export default function HeroParallax() {
    return (
        <section className="relative mx-auto max-w-[1200px] pb-10" aria-labelledby="book-title">
            <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-[var(--ilsa-blue)]/10 blur-[100px]" aria-hidden="true" />

            <div className="mb-6 w-full rounded-3xl border border-white/20 bg-white/10 p-5 text-center shadow-lg backdrop-blur-3xl sm:p-7 md:text-left">
                <p className="inline-flex rounded-full border border-white/60 bg-white/40 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ilsa-blue)] backdrop-blur-md">
                    Textos de Aquí y Ahora · N.º 18
                </p>
                <h1 id="book-title" className="mt-4 text-center text-4xl font-bold leading-[1.02] tracking-tight text-[var(--ilsa-text-dark)] sm:text-5xl md:text-left md:text-6xl">
                    Paramilitarismo <span className="text-[var(--ilsa-blue)]">del siglo XXI</span>
                </h1>
                <p className="mt-3 text-lg font-medium leading-relaxed text-[var(--ilsa-text-gray)] md:text-xl">
                    Actualidad del orden contrainsurgente en Colombia
                </p>
                <p className="mt-5 border-t border-white/60 pt-4 text-xs font-bold uppercase tracking-[0.12em] text-[var(--ilsa-blue)]">Compiladores académicos</p>
                <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm font-medium text-[var(--ilsa-text-gray)] md:justify-start">
                    <span>Francisco Toloza Fuentes</span><span aria-hidden="true">·</span>
                    <span>Stephani Ortiz Muñoz</span><span aria-hidden="true">·</span>
                    <span>Jorge Freytter-Florian</span>
                </div>
                <a
                    href="/publicaciones/textos-de-aqui-y-ahora/"
                    className="mt-5 inline-flex items-center rounded-xl border border-white/60 bg-white/40 px-4 py-2 text-sm font-semibold text-[var(--ilsa-blue)] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/60 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--ilsa-blue)]"
                >
                    Ver toda la colección <span className="ml-2" aria-hidden="true">→</span>
                </a>
            </div>

            <div className="relative mb-24 pt-2 md:mb-10" data-hero-parallax>
                <div className="relative aspect-[.82/1] overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-3xl md:aspect-[2.38/1]">
                    {sceneLayers.map((source, index) => (
                        <div key={source} data-parallax-layer data-parallax-speed={[0, 0.16, 0.25][index]} className="absolute -inset-6 will-change-transform" style={{ zIndex: index + 1 }} aria-hidden="true">
                            <img src={source} alt="" className="block h-full w-full max-w-none object-cover" />
                        </div>
                    ))}
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[var(--ilsa-blue-dark)]/15 to-transparent" aria-hidden="true" />
                </div>

                <div data-parallax-foreground className="pointer-events-none absolute inset-x-0 -bottom-[14%] z-20 mx-auto h-[125%] w-full will-change-transform md:-bottom-[20%] md:h-[145%] md:w-[74%]" aria-hidden="true">
                    <img src={foreground} alt="" className="block h-full w-full max-w-none translate-y-[20px] scale-[1.9] origin-bottom object-contain object-bottom drop-shadow-[0_18px_22px_rgba(17,24,39,.28)] md:translate-y-0 md:scale-100 md:origin-center md:object-center md:translate-x-0" />
                </div>
            </div>
        </section>
    );
}
