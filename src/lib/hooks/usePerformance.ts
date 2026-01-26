import { useState, useEffect } from 'react';

export type PerformanceTier = 'low' | 'medium' | 'high';

interface PerformanceConfig {
    tier: PerformanceTier;
    shouldRender3D: boolean;
    pixelRatio: number;
}

export function usePerformance(): PerformanceConfig {
    const [config, setConfig] = useState<PerformanceConfig>({
        tier: 'high',
        shouldRender3D: true,
        pixelRatio: 1
    });

    useEffect(() => {
        // 1. Detect Hardware Concurrency (CPU Cores)
        const logicalProcessors = navigator.hardwareConcurrency || 4;

        // 2. Detect Device Memory (RAM in GB) - Chrome only
        // @ts-ignore
        const deviceMemory = (navigator.deviceMemory as number) || 4;

        // 3. Detect Mobile/Tablet via User Agent
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // 4. Check for Reduced Motion Preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Determination Logic
        let tier: PerformanceTier = 'high';
        let shouldRender3D = true;
        let pixelRatio = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1;

        if (prefersReducedMotion) {
            tier = 'low';
            shouldRender3D = false;
        } else if (isMobile || logicalProcessors <= 4 || deviceMemory < 4) {
            tier = 'low';
            shouldRender3D = false; // Disable 3D on mobile/low-end for safety
        } else if (logicalProcessors <= 6 || deviceMemory < 8) {
            tier = 'medium';
            pixelRatio = Math.min(window.devicePixelRatio, 1.5); // Cap DPR at 1.5
        } else {
            tier = 'high';
            // Leave pixelRatio as is (capped at 2 above)
        }

        setConfig({ tier, shouldRender3D, pixelRatio });

        if (process.env.NODE_ENV === 'development') {
            console.log(`[Liquid3D] Performance Tier detected: ${tier}`, { logicalProcessors, deviceMemory, isMobile });
        }

    }, []);

    return config;
}
