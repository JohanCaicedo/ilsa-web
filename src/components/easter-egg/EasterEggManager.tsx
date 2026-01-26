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

            // Konami Code Logic (Desktop only)
            const isMobile = window.matchMedia("(max-width: 768px)").matches ||
                ('ontouchstart' in window);

            if (isMobile) return; // Mobile users use triple-tap instead

            // Normalize key to lowercase for robust matching (ignore CapsLock/Shift)
            const key = e.key.toLowerCase();
            const newSequence = [...inputSequence, key];

            // Debug log (remove in final prod if desired, but useful now)
            console.log('Easter Egg Input:', key, newSequence.slice(-10));

            // Normalize target code
            const targetCode = KONAMI_CODE.map(k => k.toLowerCase());

            // Keep only the last N keys needed
            if (newSequence.length > targetCode.length) {
                newSequence.shift();
            }

            setInputSequence(newSequence);

            // Check match
            if (JSON.stringify(newSequence) === JSON.stringify(targetCode)) {
                console.log('Konami Code Activated!');
                setIsVisible(true);
                localStorage.setItem('glass_breaker_active', 'true');
                document.body.style.overflow = 'hidden';
            }
        };

        // Listen for triple-tap activation from Navbar
        const handleTripleTap = () => {
            console.log('Triple-tap event received!');
            setIsVisible(true);
            localStorage.setItem('glass_breaker_active', 'true');
            document.body.style.overflow = 'hidden';
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('activate-easter-egg', handleTripleTap);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('activate-easter-egg', handleTripleTap);
        };
    }, [inputSequence, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] animate-in fade-in duration-500">
            <GlassBreakerEngine onExit={closeGame} />
        </div>
    );
};
