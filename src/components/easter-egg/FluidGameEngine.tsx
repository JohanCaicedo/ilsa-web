import React, { useEffect, useRef } from 'react';

interface Point {
    x: number;
    y: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
}

interface Line {
    p1: Point;
    p2: Point;
    life: number; // Lines might fade over time?
}

export const FluidGameEngine: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number | null>(null);

    // Logic State
    const score = useRef(0);
    const [gameState, setGameState] = React.useState<'playing' | 'won'>('playing');
    const WIN_SCORE = 100;

    // Game State
    const particles = useRef<Particle[]>([]);
    const lines = useRef<Line[]>([]);
    const isDrawing = useRef(false);
    const lastPoint = useRef<Point | null>(null);

    // Config
    const GRAVITY = 0.15;
    const FRICTION = 0.99;
    const SPAWN_RATE = 2; // Particles per frame

    const loop = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        // Clear Screen with trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, width, height);

        // Target Bucket (Bottom Center)
        const targetX = width / 2;
        const targetY = height - 60;
        const targetRadius = 50;

        // Draw Target
        ctx.beginPath();
        ctx.arc(targetX, targetY, targetRadius, 0, Math.PI, false); // Half circle cup
        ctx.strokeStyle = gameState === 'won' ? '#22c55e' : '#f472b6'; // Green if won, Pink default
        ctx.lineWidth = 4;
        ctx.stroke();

        // Glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = gameState === 'won' ? '#22c55e' : '#f472b6';

        // 1. Spawn Particles (Top Center)
        if (gameState === 'playing') {
            for (let i = 0; i < SPAWN_RATE; i++) {
                particles.current.push({
                    x: width / 2 + (Math.random() - 0.5) * 20,
                    y: 50,
                    vx: (Math.random() - 0.5) * 2,
                    vy: Math.random() * 2,
                    life: 1.0
                });
            }
        }

        // 2. Update & Draw Particles
        ctx.fillStyle = '#38bdf8'; // Sky blue / Cyan
        for (let i = particles.current.length - 1; i >= 0; i--) {
            const p = particles.current[i];

            // Physics
            p.vy += GRAVITY;
            p.vx *= FRICTION;
            p.vy *= FRICTION;

            // Expected next position
            const nextX = p.x + p.vx;
            const nextY = p.y + p.vy;

            // Line Collision
            let collided = false;
            for (const line of lines.current) {
                // Vector from Line Start to End
                const dx = line.p2.x - line.p1.x;
                const dy = line.p2.y - line.p1.y;
                const lenSq = dx * dx + dy * dy;

                // Project particle onto line segment
                // t = dot(AP, AB) / dot(AB, AB)
                let t = ((nextX - line.p1.x) * dx + (nextY - line.p1.y) * dy) / lenSq;
                t = Math.max(0, Math.min(1, t)); // Clamp to segment

                // Closest point on segment
                const closeX = line.p1.x + t * dx;
                const closeY = line.p1.y + t * dy;

                // Distance
                const distSq = (nextX - closeX) ** 2 + (nextY - closeY) ** 2;

                // Collision Radius (Particle radius + Line width/2)
                if (distSq < 16) { // 4^2
                    collided = true;

                    // Bounce (Reflect vector)
                    // Normal vector (normalized)
                    // Normal is orthogonal to line (-dy, dx)
                    const nLen = Math.sqrt(dx * dx + dy * dy);
                    let nx = -dy / nLen;
                    let ny = dx / nLen;

                    // Ensure normal points against velocity (or up)
                    // Check dot product with velocity
                    if (p.vx * nx + p.vy * ny > 0) {
                        nx = -nx;
                        ny = -ny;
                    }

                    // v' = v - 2(v.n)n
                    const dot = p.vx * nx + p.vy * ny;
                    p.vx = p.vx - 2 * dot * nx;
                    p.vy = p.vy - 2 * dot * ny;

                    // Add a little boost to prevent sticking
                    p.vx *= 0.8; // Energy loss
                    p.vy *= 0.8;

                    // Push out of collision
                    p.x = closeX + nx * 5;
                    p.y = closeY + ny * 5;
                    break;
                }
            }

            if (!collided) {
                p.x = nextX;
                p.y = nextY;
            }

            // Simple Floor Collision
            if (p.y > canvas.height) {
                p.vy *= -0.5;
                p.y = canvas.height;
            }

            // Draw
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();

            // Despawn if old or out of bounds (optimization)
            if (p.x < 0 || p.x > width || p.y > height + 10) {
                particles.current.splice(i, 1);
                continue; // Skip rest of loop
            }

            // Check Win Condition (Particle inside target set at line 51)
            // Target is at width/2, height-60, radius 50
            const tX = width / 2;
            const tY = height - 60;
            const dist = Math.sqrt((p.x - tX) ** 2 + (p.y - tY) ** 2);

            if (dist < 50 && p.y > tY - 10) { // Inside radius and somewhat deep
                score.current += 1;
                particles.current.splice(i, 1);

                if (score.current >= WIN_SCORE && gameState !== 'won') {
                    setGameState('won');
                }
            }
        }

        // 3. Draw Lines (Glass Barriers)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'white';

        ctx.beginPath();
        lines.current.forEach(line => {
            ctx.moveTo(line.p1.x, line.p1.y);
            ctx.lineTo(line.p2.x, line.p2.y);
        });
        ctx.stroke();

        requestRef.current = requestAnimationFrame(loop);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Resize Handler
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        // Start Loop
        requestRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    // Interaction Handlers
    const startDrawing = (e: React.MouseEvent) => {
        isDrawing.current = true;
        lastPoint.current = { x: e.clientX, y: e.clientY };
    };

    const draw = (e: React.MouseEvent) => {
        if (!isDrawing.current || !lastPoint.current) return;

        const newPoint = { x: e.clientX, y: e.clientY };

        // Add new line segment
        lines.current.push({
            p1: lastPoint.current,
            p2: newPoint,
            life: 1.0
        });

        lastPoint.current = newPoint;
    };

    const stopDrawing = () => {
        isDrawing.current = false;
        lastPoint.current = null;
    };

    return (
        <div className="relative w-full h-full">
            <canvas
                ref={canvasRef}
                className="block w-full h-full cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
            />

            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none">
                {gameState === 'won' ? (
                    <div className="animate-in zoom-in duration-500">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-2 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            ¡CAUCE COMÚN!
                        </h1>
                        <p className="text-white/80 font-light tracking-widest text-lg">
                            Has canalizado la fuerza social
                        </p>
                    </div>
                ) : (
                    <div className="text-white/30 font-mono text-xs">
                        CANALIZA EL FLUJO
                        <br />
                        <span className="text-xl text-cyan-400 font-bold">{score.current}</span> / {WIN_SCORE}
                    </div>
                )}
            </div>
        </div>
    );
};
