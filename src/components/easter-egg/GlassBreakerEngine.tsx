import React, { useEffect, useRef, useState } from 'react';

interface Block {
    x: number;
    y: number;
    width: number;
    height: number;
    domElement: HTMLElement;
    active: boolean;
    health: number;
    maxHealth: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

interface Ball {
    x: number;
    y: number;
    dx: number;
    dy: number;
    radius: number;
    active: boolean;
    rotation?: number; // Para animación de rotación visual
}

interface Props {
    onExit: () => void;
}

const SITE_ROUTES = [
    // Home
    '/',

    // Nosotros
    '/nosotros',
    '/nosotros/junta-directiva',
    '/nosotros/direccion-ejecutiva',

    // Opinión
    '/opinion',
    '/opinion/boaventura-de-sousa-santos',
    '/opinion/carlos-frederico-mares',
    '/opinion/consuelo-quattrocchi',
    '/opinion/freddy-ordonez-gomez',
    '/opinion/german-burgos',
    '/opinion/liliana-estupinan-achury',
    '/opinion/mauricio-chamorro-rosero',

    // Publicaciones
    '/publicaciones',
    '/publicaciones/archivo-historico',
    '/publicaciones/coediciones',
    '/publicaciones/derecho-y-liberacion',
    '/publicaciones/en-clave-de-sur',
    '/publicaciones/otras-publicaciones',
    '/publicaciones/revista-el-otro-derecho',
    '/publicaciones/textos-de-aqui-y-ahora',
    '/publicaciones/utiles-para-conocer-y-actuar',

    // Otras páginas
    '/donaciones',
    '/contacto',
    '/actividades',

    // Lab (opcional, puedes comentar si no quieres incluirlo)
    '/lab/liquid-test'
];

class AudioController {
    ctx: AudioContext | null = null;
    osc: OscillatorNode | null = null;
    gain: GainNode | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
            }
        }
    }

    async startBGM() {
        if (!this.ctx) return;

        this.gain = this.ctx.createGain();
        this.gain.connect(this.ctx.destination);
        this.gain.gain.value = 0.25; // Volumen más bajo para música de fondo

        try {
            // Cargar el archivo MIDI JSON
            const response = await fetch('/assets/music.json');
            const midiData = await response.json();

            // Encontrar el track del Piano
            const pianoTrack = midiData.tracks.find((track: any) => track.name === 'Piano');
            if (!pianoTrack || !pianoTrack.notes) {
                console.warn('No se encontró el track de Piano en el MIDI');
                return;
            }

            // Función para convertir número MIDI a frecuencia
            const midiToFreq = (midi: number): number => {
                return 440 * Math.pow(2, (midi - 69) / 12);
            };

            // Función para reproducir una nota
            const playNote = (freq: number, startTime: number, duration: number, velocity: number) => {
                if (!this.ctx || !this.gain) return;

                const osc = this.ctx.createOscillator();
                const noteGain = this.ctx.createGain();

                // Sonido GBA: onda cuadrada
                osc.type = 'square';
                osc.frequency.value = freq;

                // control ganancia según velocity MIDI
                const volume = velocity * 0.3; // Ajustar volumen con velocity
                noteGain.gain.setValueAtTime(volume, startTime);
                noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

                osc.connect(noteGain);
                noteGain.connect(this.gain);

                osc.start(startTime);
                osc.stop(startTime + duration);
            };

            // Programar todas las notas
            const scheduleMusic = () => {
                if (!this.ctx) return;

                const startTime = this.ctx.currentTime + 0.1;

                pianoTrack.notes.forEach((note: any) => {
                    const freq = midiToFreq(note.midi);
                    const time = startTime + note.time;
                    const duration = note.duration * 0.95; // Ligeramente más corto para articulación
                    const velocity = note.velocity || 0.7;

                    playNote(freq, time, duration, velocity);
                });

                // Calcular duración total de la música
                const lastNote = pianoTrack.notes[pianoTrack.notes.length - 1];
                const totalDuration = (lastNote.time + lastNote.duration + 1) * 1000;

                // Repetir la música en loop
                this.bgmInterval = window.setTimeout(() => {
                    scheduleMusic();
                }, totalDuration);
            };

            scheduleMusic();

        } catch (error) {
            console.error('Error cargando música MIDI:', error);
        }
    }

    bgmInterval: number | null = null;

    stopBGM() {
        if (this.bgmInterval) {
            clearTimeout(this.bgmInterval); // Ahora usamos setTimeout en lugar de setInterval
            this.bgmInterval = null;
        }
        if (this.gain) {
            this.gain.disconnect();
            this.gain = null;
        }
    }

    resume() {
        if (this.ctx?.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playBeep() {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    playLaunch() {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(440, this.ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.2);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }

    playBoost() {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    }

    playLoss() {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.3);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
    }

    playWin() {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 1046.50];
        const times = [0, 0.1, 0.2, 0.3, 0.4, 0.6];
        const durations = [0.1, 0.1, 0.1, 0.1, 0.1, 0.4];

        notes.forEach((freq, i) => {
            const osc = this.ctx!.createOscillator();
            const gain = this.ctx!.createGain();

            osc.connect(gain);
            gain.connect(this.ctx!.destination);

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now + times[i]);

            gain.gain.setValueAtTime(0.1, now + times[i]);
            gain.gain.exponentialRampToValueAtTime(0.01, now + times[i] + durations[i]);

            osc.start(now + times[i]);
            osc.stop(now + times[i] + durations[i]);
        });
    }
}


export const GlassBreakerEngine: React.FC<Props> = ({ onExit }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);
    const audioRef = useRef<AudioController | null>(null);

    const totalScoreRef = useRef(0);

    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0); // This represents SESSION score
    const [displayTotalScore, setDisplayTotalScore] = useState(0); // Display aggregation
    const [gameState, setGameState] = useState<'scanning' | 'ready' | 'playing' | 'gameover'>('scanning');

    const balls = useRef<Ball[]>([]);
    const paddle = useRef({ x: 0, width: 280, height: 12 });
    const blocks = useRef<Block[]>([]);
    const particles = useRef<Particle[]>([]);
    const ballImg = useRef<HTMLImageElement | null>(null);

    const ILSA_BLUE = '#4E7CCE';
    const ILSA_BLUE_DARK = '#375a9e';
    const ILSA_TEXT_DARK = '#111827';
    const INITIAL_SPEED = 9;
    const FAVICON_URL = "https://api.ilsa.org.co/wp-content/uploads/2023/05/cropped-ILSA-Azul-Favicon-45-anos.png";

    useEffect(() => {
        audioRef.current = new AudioController();
        audioRef.current.startBGM();

        const img = new Image();
        img.src = FAVICON_URL;
        img.onload = () => {
            ballImg.current = img;
        };

        if (typeof window !== 'undefined') {
            const savedTotal = localStorage.getItem('glass_total_score');
            if (savedTotal) {
                const parsed = parseInt(savedTotal);
                totalScoreRef.current = parsed;
                setDisplayTotalScore(parsed);
            }
        }

        const scanElements = () => {
            const newBlocks: Block[] = [];

            // Define selectors with associated health
            // Note: We use querySelectorAll for all, then assign health logic
            const allSelector = [
                'h1', 'h2', 'h3', 'p',
                'img', 'button', 'a.btn',
                '.card', 'article', 'nav',
                'header', 'footer'
            ].join(',');

            const elements = document.querySelectorAll(allSelector);

            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (
                    rect.width > 20 &&
                    rect.height > 20 &&
                    rect.top >= 0 &&
                    rect.top < window.innerHeight
                ) {
                    if ((el as HTMLElement).style.opacity === '0') return;

                    let hp = 1;
                    const tagName = el.tagName.toLowerCase();

                    if (tagName === 'p') hp = 2;
                    else if (['h2', 'h3', 'h4'].includes(tagName)) hp = 3; // Reduced slightly for balance
                    else if (['nav', 'header', 'footer'].includes(tagName)) hp = 5;

                    // 10% chance of random bonus health (up to 5)
                    if (Math.random() > 0.9) hp = Math.min(hp + 2, 5);

                    newBlocks.push({
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height,
                        domElement: el as HTMLElement,
                        active: true,
                        health: hp,
                        maxHealth: hp
                    });
                }
            });

            if (newBlocks.length === 0) {
                navigateToRandomPage();
                return;
            }

            blocks.current = newBlocks;
            resetBall();
            setGameState('ready');
        };

        const t = setTimeout(scanElements, 100);

        return () => {
            clearTimeout(t);
            if (audioRef.current) audioRef.current.stopBGM();
            blocks.current.forEach(b => {
                if (b.domElement) b.domElement.style.opacity = '';
            });
        };
    }, []);

    const resetBall = () => {
        balls.current = [{
            x: 0, y: 0, dx: 0, dy: 0, radius: 18, active: true
        }];
        paddle.current.x = window.innerWidth / 2 - paddle.current.width / 2;
    };

    const spawnMultiball = (x: number, y: number) => {
        if (balls.current.length > 30) return;
        balls.current.push({
            x: x, y: y,
            dx: (Math.random() - 0.5) * 12,
            dy: -Math.abs((Math.random() * 8) + 4),
            radius: 12, active: true
        });
    };

    const navigateToRandomPage = () => {
        let nextRoute = SITE_ROUTES[Math.floor(Math.random() * SITE_ROUTES.length)];
        if (nextRoute === window.location.pathname && SITE_ROUTES.length > 1) {
            nextRoute = SITE_ROUTES.find(r => r !== nextRoute) || '/';
        }
        window.location.href = nextRoute;
    };

    const triggerConfetti = () => {
        const colors = [ILSA_BLUE, '#ffffff', '#FFD700', '#FF69B4', '#00FF00'];
        for (let i = 0; i < 200; i++) {
            particles.current.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: (Math.random() - 0.5) * 25,
                vy: (Math.random() - 0.5) * 25,
                life: 3.0,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4
            });
        }
    };

    const handleWin = () => {
        audioRef.current?.playWin();
        triggerConfetti();

        // Calculate points for this round
        // Note: 'score' state in this closure might be stale if handleWin called from loop?
        // Actually handleWin is called from loop, so 'score' IS stale (it will be 0 or initial).
        // WE MUST USE A REF for session score if we want to read it accurately in the loop callback!
        // But wait, setScore implementation sets session score properly.
        // We can just add the lifeBonus effectively to the TOTAL directly.

        // However, 'score' is being incremented via setScore(s => s+100).
        // So we don't have the final value easily accessible here synchronously unless we track it
        // in a ref as well.

        // Let's rely on what we have. For now, let's just save the Life Bonus to total.
        // The block breakage points (100 each) should happen immediately.

        // FIX: We need to change the block-break logic to update totalScoreRef immediately too.

        const lifeBonus = lives * 500;

        const newTotal = totalScoreRef.current + lifeBonus;
        totalScoreRef.current = newTotal;
        setDisplayTotalScore(newTotal);
        localStorage.setItem('glass_total_score', newTotal.toString());

        localStorage.removeItem('glass_breaker_active');

        setTimeout(() => {
            navigateToRandomPage();
        }, 4000);
    };

    const handleGameOver = () => {
        // Points are already saved incrementally when blocks break.
        // Just fail state.
        setGameState('gameover');
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            paddle.current.x = e.clientX - rect.left - paddle.current.width / 2;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault(); // Prevenir scroll
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            if (touch) {
                paddle.current.x = touch.clientX - rect.left - paddle.current.width / 2;
            }
        };

        const handleInput = (e: KeyboardEvent | MouseEvent | TouchEvent) => {
            audioRef.current?.resume();

            if (gameState === 'ready') {
                if ((e instanceof KeyboardEvent && e.code === 'Space') || e.type === 'click' || e.type === 'touchstart') {
                    const b = balls.current[0];
                    if (b) {
                        b.dx = (Math.random() - 0.5) * 6;
                        b.dy = -INITIAL_SPEED;
                    }
                    audioRef.current?.playLaunch();
                    setGameState('playing');
                }
            } else if (gameState === 'playing') {
                if (e.type === 'click' || e.type === 'touchstart' || (e instanceof KeyboardEvent && e.code === 'Space')) {
                    balls.current.forEach(b => {
                        if (b.active) {
                            b.dx *= 1.3;
                            b.dy *= 1.3;
                            const max = 18;
                            b.dx = Math.max(-max, Math.min(max, b.dx));
                            b.dy = Math.max(-max, Math.min(max, b.dy));
                        }
                    });
                    audioRef.current?.playBoost();
                }

            } else if (gameState === 'gameover') {
                if ((e instanceof KeyboardEvent && e.code === 'Space')) {
                    onExit();
                }
                if ((e instanceof KeyboardEvent && e.code === 'Enter')) {
                    window.location.reload();
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('keydown', handleInput);
        window.addEventListener('click', handleInput);
        window.addEventListener('touchstart', handleInput);

        const loop = () => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            let activeBallsCount = 0;

            if (gameState === 'ready') {
                const b = balls.current[0];
                if (b) {
                    b.x = paddle.current.x + paddle.current.width / 2;
                    b.y = height - 50 - b.radius;
                }
                activeBallsCount = 1;

            } else if (gameState === 'playing') {

                balls.current.forEach(b => {
                    if (!b.active) return;
                    activeBallsCount++;

                    b.x += b.dx;
                    b.y += b.dy;

                    if (b.x + b.radius > width || b.x - b.radius < 0) b.dx *= -1;
                    if (b.y - b.radius < 0) b.dy *= -1;

                    if (b.y - b.radius > height) {
                        b.active = false;
                        activeBallsCount--;
                        audioRef.current?.playLoss();
                    }

                    // Paddle Collision
                    if (
                        b.y + b.radius >= height - 40 &&
                        b.y - b.radius <= height - 40 + paddle.current.height &&
                        b.x >= paddle.current.x &&
                        b.x <= paddle.current.x + paddle.current.width
                    ) {
                        b.dy = -Math.abs(b.dy);
                        const hitPoint = (b.x - (paddle.current.x + paddle.current.width / 2)) / (paddle.current.width / 2);
                        b.dx = hitPoint * 12;
                        audioRef.current?.playLaunch();
                    }

                    // Block Collision
                    for (const block of blocks.current) {
                        if (!block.active) continue;

                        if (
                            b.x > block.x - b.radius &&
                            b.x < block.x + block.width + b.radius &&
                            b.y > block.y - b.radius &&
                            b.y < block.y + block.height + b.radius
                        ) {
                            // Logic Update: Decrement Health
                            block.health -= 1;
                            audioRef.current?.playBeep();

                            // Visual Feedback for Damage
                            const healthPct = block.health / block.maxHealth;
                            block.domElement.style.transition = 'opacity 0.1s';
                            block.domElement.style.opacity = (healthPct * 0.8 + 0.2).toString(); // Never fully invisible until destroyed

                            // Bounce logic
                            const cx = block.x + block.width / 2;
                            const cy = block.y + block.height / 2;
                            const dx = b.x - cx;
                            const dy = b.y - cy;

                            if (Math.abs(dx / (block.width / 2)) > Math.abs(dy / (block.height / 2))) {
                                b.dx *= -1;
                            } else {
                                b.dy *= -1;
                            }

                            // Destroy logic
                            if (block.health <= 0) {
                                block.active = false;
                                block.domElement.style.opacity = '0';

                                // Update Session Score for legacy/debug
                                setScore(s => s + 100);

                                // Update Persistent Score Immediately
                                const newTotal = totalScoreRef.current + 100;
                                totalScoreRef.current = newTotal;
                                setDisplayTotalScore(newTotal);
                                localStorage.setItem('glass_total_score', newTotal.toString());

                                for (let i = 0; i < 8; i++) {
                                    particles.current.push({
                                        x: block.x + Math.random() * block.width,
                                        y: block.y + Math.random() * block.height,
                                        vx: (Math.random() - 0.5) * 10,
                                        vy: (Math.random() - 0.5) * 10,
                                        life: 1.0,
                                        color: Math.random() > 0.5 ? ILSA_BLUE : 'white',
                                        size: Math.random() * 4 + 2
                                    });
                                }
                                spawnMultiball(b.x, b.y);
                            }

                            break; // Hit one block per frame per ball
                        }
                    }
                });

                // Check for win condition AFTER processing all collisions
                // This ensures blocks destroyed in this frame are counted
                const remainingBlocks = blocks.current.filter(b => b.active).length;
                if (remainingBlocks === 0 && blocks.current.length > 0) {
                    handleWin();
                    return;
                }

                if (activeBallsCount === 0) {
                    if (lives > 1) {
                        setLives(l => l - 1);
                        setGameState('ready');
                        resetBall();
                    } else {
                        setLives(0);
                        handleGameOver();
                    }
                }
            }

            // ... (particles loop same)
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                if (p.life <= 0) particles.current.splice(i, 1);
            }

            // Render Blocks with Health-based Opacity/Color logic?
            blocks.current.forEach(block => {
                if (!block.active) return;

                // Opacity based on health ratio
                const ratio = block.health / block.maxHealth;

                ctx.shadowBlur = 15 * ratio;
                ctx.shadowColor = '#FFB800';

                ctx.strokeStyle = `rgba(255, 214, 0, ${ratio * 0.8 + 0.2})`; // Fade stroke slightly
                ctx.lineWidth = 2.5;

                ctx.fillStyle = `rgba(255, 184, 0, ${0.1 * ratio})`;
                ctx.fillRect(block.x, block.y, block.width, block.height);

                ctx.strokeRect(block.x, block.y, block.width, block.height);

                ctx.shadowBlur = 0;
            });

            // ... (paddle and rest same)
            const grd = ctx.createLinearGradient(paddle.current.x, 0, paddle.current.x + paddle.current.width, 0);
            grd.addColorStop(0, ILSA_BLUE);
            grd.addColorStop(1, ILSA_BLUE_DARK);

            ctx.fillStyle = grd;
            ctx.shadowBlur = 10;
            ctx.shadowColor = ILSA_BLUE;

            ctx.beginPath();
            ctx.roundRect(paddle.current.x, height - 40, paddle.current.width, paddle.current.height, 6);
            ctx.fill();
            ctx.shadowBlur = 0;

            balls.current.forEach(b => {
                if (!b.active) return;

                if (ballImg.current) {
                    // Guardar el estado actual del canvas
                    ctx.save();

                    // Trasladar al centro de la pelota
                    ctx.translate(b.x, b.y);

                    // Calcular rotación basada en la velocidad horizontal
                    // La rotación acumulada simula que la pelota "rueda"
                    const rotationSpeed = b.dx * 0.1; // Ajustar sensibilidad
                    if (!b.rotation) b.rotation = 0; // Inicializar si no existe
                    b.rotation += rotationSpeed;

                    ctx.rotate(b.rotation);

                    // Dibujar la imagen centrada en el origen (0,0)
                    ctx.drawImage(ballImg.current, -b.radius, -b.radius, b.radius * 2, b.radius * 2);

                    // Restaurar el estado del canvas
                    ctx.restore();
                } else {
                    ctx.fillStyle = ILSA_TEXT_DARK;
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    ctx.arc(b.x - 2, b.y - 2, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            particles.current.forEach(p => {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.rect(p.x, p.y, p.size, p.size);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            requestRef.current = requestAnimationFrame(loop);
        };

        requestRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('keydown', handleInput);
            window.removeEventListener('click', handleInput);
            window.removeEventListener('touchstart', handleInput);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };

    }, [gameState, lives]); // totalScore used in handleWin ref closure? Ideally no, refs or state?
    // Using refs for blocks but state for Score. Score inside loop will be closure stale if not careful?
    // Actually loop calls handleWin which uses setScore(callback). That's fine.
    // READ totalScore inside handleWin? It will be stale.
    // We should use a ref for totalScore if we want to read it in the loop reliably without re-binding?
    // Or just rely on setTotalScore callback?
    // setTotalScore(prev => prev + scoreRef.current)

    // Minimal change: just use block logic in view. Score display needs update too.


    return (
        <div className="fixed inset-0 z-[10000] font-sans cursor-none select-none pointer-events-none">
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                className="block w-full h-full pointer-events-auto"
            />

            {/* Score Panel - Premium Glass */}
            <div className="absolute top-6 left-8 flex flex-col font-sans drop-shadow-sm pointer-events-none">
                <div className="bg-white/30 backdrop-blur-xl border border-white/40 px-5 py-3 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.07)]">
                    <span className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-1 block opacity-80">Puntaje Total</span>
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4E7CCE] to-[#375a9e] font-mono tabular-nums leading-none">
                        {displayTotalScore.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Lives Panel - Glowing Orbs */}
            <div className="absolute top-6 right-8 pointer-events-none">
                <div className="bg-white/30 backdrop-blur-xl border border-white/40 px-4 py-3 rounded-full shadow-sm flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider text-slate-600 font-bold mr-1">Vidas</span>
                    <div className="flex gap-1.5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 rounded-full transition-all duration-500 border border-white/50 ${i < lives
                                    ? "bg-gradient-to-tr from-[#4E7CCE] to-cyan-400 shadow-[0_0_10px_rgba(78,124,206,0.6)] scale-100"
                                    : "bg-slate-200/50 scale-75 opacity-50"
                                    }`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Exit Button - Mobile Friendly */}
            <button
                onClick={onExit}
                className="absolute top-20 right-8 bg-red-500/80 hover:bg-red-600/90 active:bg-red-700/90 backdrop-blur-xl border border-white/40 px-4 py-2 rounded-full shadow-lg pointer-events-auto transition-all active:scale-95 z-50"
            >
                <span className="text-white text-xs font-bold">✕ SALIR</span>
            </button>

            {/* Controls Hint - Top Center */}
            {gameState !== 'gameover' && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none drop-shadow-sm">
                    <div className="bg-white/30 backdrop-blur-xl border border-white/40 px-5 py-3 rounded-full flex gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest shadow-[0_8px_32px_rgba(31,38,135,0.07)]">
                        <span className="flex items-center gap-2"><span className="bg-white/60 px-1.5 py-0.5 rounded text-[#4E7CCE] ring-1 ring-white/50">ESPACIO</span> LANZAR</span>
                        <span className="w-px h-full bg-slate-400/20"></span>
                        <span className="flex items-center gap-2"><span className="bg-white/60 px-1.5 py-0.5 rounded text-[#4E7CCE] ring-1 ring-white/50">ESC</span> SALIR</span>
                    </div>
                </div>
            )}

            {/* Ready State - Floating Pill */}
            {gameState === 'ready' && (
                <div className="absolute top-2/3 left-1/2 -translate-x-1/2 text-center pointer-events-none z-50">
                    <div className="bg-white/60 backdrop-blur-2xl px-8 py-4 rounded-full border border-white/60 shadow-[0_0_40px_rgba(78,124,206,0.2)] animate-pulse">
                        <p className="text-sm font-bold text-[#4E7CCE] tracking-[0.2em] uppercase">
                            Clic para iniciar
                        </p>
                    </div>
                </div>
            )}

            {/* Game Over Modal - Ultra Glass */}
            {gameState === 'gameover' && (
                <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm flex items-center justify-center flex-col animate-in fade-in duration-500 pointer-events-auto cursor-auto z-50">
                    <div className="bg-white/80 backdrop-blur-2xl p-12 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white/60 text-center max-w-md w-full relative overflow-hidden group">

                        {/* Decorative Background gradient */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#4E7CCE] via-cyan-400 to-[#4E7CCE]"></div>
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>

                        <h1 className="text-4xl font-bold text-slate-800 mb-2 tracking-tight">¡Juego Terminado!</h1>
                        <div className="my-8 relative">
                            <span className="text-sm text-slate-500 uppercase tracking-widest font-semibold block mb-2">Puntaje Final</span>
                            <span className="text-5xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#4E7CCE] to-[#375a9e]">
                                {score.toLocaleString()}
                            </span>
                        </div>

                        <div className="flex gap-4 justify-center relative z-10 w-full">
                            <button
                                onClick={onExit}
                                className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
                            >
                                Salir
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.setItem('glass_breaker_active', 'true');
                                    window.location.reload();
                                }}
                                className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#4E7CCE] to-[#375a9e] text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
