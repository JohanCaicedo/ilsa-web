import React, { useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Liquid3DProps {
    intensity?: "low" | "medium" | "high";
    frosted?: boolean;
}

const GlassPanel: React.FC<Liquid3DProps> = ({ intensity = "medium", frosted = false }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    // Preset configurations for detail and quality
    const config = {
        low: { samples: 6, resolution: 512, thickness: 0.2 },
        medium: { samples: 10, resolution: 512, thickness: 1.5 },
        high: { samples: 16, resolution: 1024, thickness: 2.5 }
    };

    const settings = config[intensity];
    const roughness = frosted ? 0.6 : 0.2;

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <MeshTransmissionMaterial
                backside={false}
                samples={settings.samples}
                resolution={settings.resolution}
                transmission={0}            // Disabled to ensure reliable overlay on HTML
                transparent={true}
                opacity={frosted ? 0.2 : 0.05} // Increased slightly for milky look
                roughness={roughness}
                thickness={settings.thickness}
                ior={1.7}
                chromaticAberration={1.0}   // MAX ABERRATION for rainbow edges
                anisotropy={0.7}
                distortion={0.8}
                distortionScale={0.6}
                temporalDistortion={0.15}
                color="#ffffff"
                toneMapped={false}
                envMapIntensity={4.5}
            />
        </mesh>
    );
};

export default function Liquid3D(props: Liquid3DProps) {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 0 }}>
            <Canvas
                dpr={[1, 2]}
                gl={{ alpha: true, antialias: true }}
                camera={{ position: [0, 0, 5], fov: 45 }}
                resize={{ scroll: false, debounce: 0 }}
            >
                <GlassPanel {...props} />
                <ambientLight intensity={1} />
                <pointLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
                <pointLight position={[-10, 5, 10]} intensity={1.5} color="#a0c5ff" />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
