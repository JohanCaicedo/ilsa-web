import React, { useEffect, useState } from 'react';
import { GlassBreakerEngine } from './GlassBreakerEngine';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

export const EasterEggManager: React.FC = () => {
    const [inputSequence, setInputSequence] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if game should auto-start (from "Try Again" reload)
        const shouldAutoStart = localStorage.getItem('glass_breaker_active') === 'true';
        if (shouldAutoStart) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const closeGame = () => {
        setIsVisible(false);
        setInputSequence([]);
        document.body.style.overflow = ''; // Restore scrolling
        localStorage.removeItem('glass_breaker_active'); // Clear auto-start flag
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Logic for Escape key to close
            if (e.key === 'Escape' && isVisible) {
                closeGame();
                return;
            }

            // If game is active, don't listen for code (except Esc)
            if (isVisible) return;

            // Konami Code Logic
            const newSequence = [...inputSequence, e.key];

            // Keep only the last N keys needed
            if (newSequence.length > KONAMI_CODE.length) {
                newSequence.shift();
            }

            setInputSequence(newSequence);

            // Check match
            if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
                // Verify it's not mobile before activating
                const isMobile = window.matchMedia("(max-width: 768px)").matches ||
                    ('ontouchstart' in window);

                if (!isMobile) {
                    setIsVisible(true);
                    localStorage.setItem('glass_breaker_active', 'true'); // Persist active state
                    document.body.style.overflow = 'hidden'; // Lock scrolling
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [inputSequence, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] animate-in fade-in duration-500">
            <div className="absolute top-4 right-4 text-gray-400 text-sm font-mono z-50">
                [ESC] to exit
            </div>
            <GlassBreakerEngine onExit={closeGame} />
        </div>
    );
};
