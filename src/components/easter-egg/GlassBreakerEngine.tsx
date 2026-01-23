import React, { useEffect, useRef, useState } from 'react';

interface Block {
    x: number;
    y: number;
    width: number;
    height: number;
    domElement: HTMLElement;
    active: boolean;
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
}

interface Props {
    onExit: () => void;
}

const SITE_ROUTES = [
    '/',
    '/nosotros',
    '/nosotros/junta-directiva',
    '/nosotros/direccion-ejecutiva',
    '/opinion',
    '/publicaciones',
    '/donaciones',
    '/contacto',
    '/actividades'
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

    startBGM() {
        if (!this.ctx) return;

        const N = {
            E5: 659.25, E4: 329.63, C4: 261.63, G4: 392.00, C5: 523.25,
            G3: 196.00, C3: 130.81, A3: 220.00, B3: 246.94, Bb3: 233.08,
            A4: 440.00, G5: 783.99, F5: 698.46, A5: 880.00, B5: 987.77,
            B4: 493.88, Bb4: 466.16, D5: 587.33, F4: 349.23, D4: 293.66
        };

        const tempo = 1.0;
        let noteTime = this.ctx.currentTime;

        this.gain = this.ctx.createGain();
        this.gain.connect(this.ctx.destination);
        this.gain.gain.value = 0.3;

        const playNote = (freq: number, dur: number, time: number) => {
            if (!this.ctx || !this.gain) return;
            const osc = this.ctx.createOscillator();
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, time);

            const noteGain = this.ctx.createGain();
            noteGain.gain.setValueAtTime(0.3, time);
            noteGain.gain.exponentialRampToValueAtTime(0.001, time + dur - 0.05);

            osc.connect(noteGain);
            noteGain.connect(this.gain);

            osc.start(time);
            osc.stop(time + dur);
        };

        const scheduleLoop = () => {
            const now = this.ctx!.currentTime;
            if (noteTime < now || noteTime > now + 3.0) {
                noteTime = now + 0.1;
            }

            const s = 0.2;
            const l = 0.4;

            const melody = [
                [N.F4, s], [N.A4, s], [N.C5, l],
                [N.D5, s], [N.C5, s], [N.B4, s], [N.A4, s],
                [N.B4, s], [N.E4, s], [N.G4, l],
                [N.A4, s], [N.G4, s], [N.F4, s], [N.E4, s],
                [N.F4, s], [N.A4, s], [N.C5, l],
                [N.D5, s], [N.C5, s], [N.B4, s], [N.A4, s],
                [N.B4, s], [N.E4, s], [N.C5, l],
                [N.E5, s], [N.D5, s], [N.C5, s], [N.G4, s],
                [0, s]
            ];

            melody.forEach(([freq, dur]) => {
                if (freq > 0) playNote(freq, dur * 0.9, noteTime);
                noteTime += dur;
            });
        };

        scheduleLoop();

        const loopInterval = 6600;
        this.bgmInterval = window.setInterval(scheduleLoop, loopInterval);
    }

    bgmInterval: number | null = null;

    stopBGM() {
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
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

    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(0);
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
            const savedScore = localStorage.getItem('glass_score');
            if (savedScore) {
                setScore(parseInt(savedScore));
            }
        }

        const scanElements = () => {
            const newBlocks: Block[] = [];
            const selector = [
                'h1', 'h2', 'h3', 'p',
                'img', 'button', 'a.btn',
                '.card', 'article', 'nav',
                'header', 'footer'
            ].join(',');

            const elements = document.querySelectorAll(selector);

            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (
                    rect.width > 20 &&
                    rect.height > 20 &&
                    rect.top >= 0 &&
                    rect.top < window.innerHeight
                ) {
                    if ((el as HTMLElement).style.opacity === '0') return;

                    newBlocks.push({
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height,
                        domElement: el as HTMLElement,
                        active: true
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

        setScore(prevScore => {
            const lifeBonus = lives * 500;
            const finalScore = prevScore + lifeBonus;
            return finalScore;
        });

        localStorage.removeItem('glass_breaker_active');

        setTimeout(() => {
            navigateToRandomPage();
        }, 4000);
    };

    const handleGameOver = () => {
        localStorage.removeItem('glass_score');
        setGameState('gameover');
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            paddle.current.x = e.clientX - rect.left - paddle.current.width / 2;
        };

        const handleInput = (e: KeyboardEvent | MouseEvent) => {
            audioRef.current?.resume();

            if (gameState === 'ready') {
                if ((e instanceof KeyboardEvent && e.code === 'Space') || e.type === 'click') {
                    const b = balls.current[0];
                    if (b) {
                        b.dx = (Math.random() - 0.5) * 6;
                        b.dy = -INITIAL_SPEED;
                    }
                    audioRef.current?.playLaunch();
                    setGameState('playing');
                }
            } else if (gameState === 'playing') {
                if (e.type === 'click' || (e instanceof KeyboardEvent && e.code === 'Space')) {
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
        window.addEventListener('keydown', handleInput);
        window.addEventListener('click', handleInput);

        const loop = () => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            let activeBallsCount = 0;
            let activeBlocksCount = 0;

            blocks.current.forEach(b => { if (b.active) activeBlocksCount++ });

            if (activeBlocksCount === 0 && blocks.current.length > 0 && gameState === 'playing') {
                handleWin();
                return;
            }

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

                    for (const block of blocks.current) {
                        if (!block.active) continue;

                        if (
                            b.x > block.x - b.radius &&
                            b.x < block.x + block.width + b.radius &&
                            b.y > block.y - b.radius &&
                            b.y < block.y + block.height + b.radius
                        ) {
                            block.active = false;

                            block.domElement.style.transition = 'opacity 0.1s';
                            block.domElement.style.opacity = '0';

                            const cx = block.x + block.width / 2;
                            const cy = block.y + block.height / 2;
                            const dx = b.x - cx;
                            const dy = b.y - cy;

                            if (Math.abs(dx / (block.width / 2)) > Math.abs(dy / (block.height / 2))) {
                                b.dx *= -1;
                            } else {
                                b.dy *= -1;
                            }

                            setScore(s => s + 100);
                            audioRef.current?.playBeep();

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
                            break;
                        }
                    }
                });

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

            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                if (p.life <= 0) particles.current.splice(i, 1);
            }

            blocks.current.forEach(block => {
                if (!block.active) return;
                ctx.strokeStyle = 'rgba(78, 124, 206, 0.4)';
                ctx.lineWidth = 1;
                ctx.strokeRect(block.x, block.y, block.width, block.height);
            });

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
                    ctx.drawImage(ballImg.current, b.x - b.radius, b.y - b.radius, b.radius * 2, b.radius * 2);
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
            window.removeEventListener('keydown', handleInput);
            window.removeEventListener('click', handleInput);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };

    }, [gameState, lives]);


    return (
        <div className="fixed inset-0 z-[10000] font-sans cursor-none select-none pointer-events-none">
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
                className="block w-full h-full pointer-events-auto"
            />

            <div className="absolute top-6 left-8 flex flex-col font-sans drop-shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">PUNTAJE TOTAL</span>
                <span className="text-2xl font-bold text-[#4E7CCE] animate-in slide-in-from-left-2">{score.toLocaleString()}</span>
            </div>

            <div className="absolute top-6 right-8 flex gap-1 drop-shadow-md">
                {Array.from({ length: lives }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-[#4E7CCE]"></div>
                ))}
            </div>

            {gameState === 'ready' && (
                <div className="absolute top-2/3 left-1/2 -translate-x-1/2 text-center pointer-events-none drop-shadow-lg">
                    <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border border-blue-100 shadow-xl animate-bounce">
                        <p className="text-sm font-medium text-[#4E7CCE] tracking-wide">
                            CLIC PARA INICIAR
                        </p>
                    </div>
                </div>
            )}

            {gameState === 'gameover' && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-md flex items-center justify-center flex-col animate-in fade-in duration-500 pointer-events-auto cursor-auto">
                    <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 text-center">
                        <h1 className="text-4xl font-bold text-[#111827] mb-2">¡Juego Terminado!</h1>
                        <p className="text-xl text-[#4E7CCE] mb-8 font-medium">Puntaje Final: {score.toLocaleString()}</p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => {
                                    localStorage.setItem('glass_breaker_active', 'true');
                                    window.location.reload();
                                }}
                                className="px-6 py-2 bg-[#4E7CCE] text-white rounded-lg font-medium hover:bg-[#375a9e] transition-colors shadow-lg hover:shadow-xl"
                            >
                                Intentar de Nuevo
                            </button>
                            <button
                                onClick={onExit}
                                className="px-6 py-2 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                Salir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
