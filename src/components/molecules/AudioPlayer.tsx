import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
    src: string;
    title?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);

            // Fallback: update duration if needed
            if (audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity && audio.duration !== duration) {
                setDuration(audio.duration);
            }
        };

        const setAudioDuration = () => {
            if (audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity) {
                setDuration(audio.duration);
            }
        };

        const onEnd = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        // Reset state when src changes
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        // Duration will be updated by loadedmetadata

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("loadedmetadata", setAudioDuration);
        audio.addEventListener("durationchange", setAudioDuration);
        audio.addEventListener("ended", onEnd);

        // Trigger load if readyState is already enough (for hydration or cache)
        if (audio.readyState >= 1) {
            setAudioDuration();
        }

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("loadedmetadata", setAudioDuration);
            audio.removeEventListener("durationchange", setAudioDuration);
            audio.removeEventListener("ended", onEnd);
        };
    }, [src]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!audioRef.current) return;
        const seekTime = (parseFloat(e.target.value) / 100) * duration;
        audioRef.current.currentTime = seekTime;
        setProgress(parseFloat(e.target.value));
    };

    const skip = (seconds: number) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime += seconds;
    };

    const toggleSpeed = () => {
        if (!audioRef.current) return;
        let newRate = 1;
        if (playbackRate === 1) newRate = 1.5;
        else if (playbackRate === 1.5) newRate = 2;
        else newRate = 1;

        audioRef.current.playbackRate = newRate;
        setPlaybackRate(newRate);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    if (!src) return null;

    return (
        <div className="w-full max-w-2xl mx-auto my-8 p-6 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl flex flex-col gap-4 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/15 hover:scale-[1.01] hover:shadow-2xl group">
            <audio ref={audioRef} src={src} preload="metadata" />

            {/* Header: Label + AI Tag + Secondary Controls */}
            <div className="flex justify-between items-center w-full px-1">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-xs tracking-wide transition-colors duration-300">
                        Escucha este artículo
                    </span>
                    <span className="px-1.5 py-px rounded-full bg-[#4e7cce]/5 border border-[#4e7cce]/10 text-[9px] font-bold text-[#4e7cce]/80 uppercase tracking-wider shadow-sm">
                        IA Generado
                    </span>
                </div>

                {/* Secondary Controls: Speed, Skip, Mute - Compact Version */}
                <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    {/* Seek Buttons */}
                    <div className="flex items-center gap-1">
                        <button onClick={() => skip(-10)} className="text-slate-500 hover:text-[#4e7cce] hover:bg-white/40 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] p-1 rounded-full active:scale-90" aria-label="Rewind 10s">
                            <RotateCcw className="w-3 h-3" />
                            <span className="sr-only">-10s</span>
                        </button>
                        <button onClick={() => skip(10)} className="text-slate-500 hover:text-[#4e7cce] hover:bg-white/40 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] p-1 rounded-full active:scale-90" aria-label="Forward 10s">
                            <RotateCw className="w-3 h-3" />
                            <span className="sr-only">+10s</span>
                        </button>
                    </div>

                    <div className="w-px h-2.5 bg-slate-300/30 mx-1"></div>

                    {/* Speed Toggle */}
                    <button
                        onClick={toggleSpeed}
                        className="flex items-center justify-center w-auto px-1.5 h-5 rounded text-[9px] font-bold text-slate-500 hover:bg-white/40 hover:text-[#4e7cce] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] tabular-nums active:scale-95"
                    >
                        {playbackRate}x
                    </button>

                    <div className="w-px h-2.5 bg-slate-300/30 mx-1"></div>

                    {/* Mute Toggle */}
                    <button
                        onClick={toggleMute}
                        className="text-slate-500 hover:text-[#4e7cce] hover:bg-white/40 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] p-1 rounded-full active:scale-90"
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? (
                            <VolumeX className="w-3 h-3" />
                        ) : (
                            <Volume2 className="w-3 h-3" />
                        )}
                    </button>
                </div>
            </div>

            {/* Main Controls Row */}
            <div className="flex items-center gap-4 w-full">
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#4e7cce] text-white shadow-lg shadow-[#4e7cce]/20 hover:scale-110 hover:bg-[#5b2cbd] hover:shadow-[#5b2cbd]/30 active:scale-90 active:rotate-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-[#4e7cce]"
                    aria-label={isPlaying ? "Pausar" : "Reproducir"}
                >
                    {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                    ) : (
                        <Play className="w-5 h-5 fill-current ml-1" />
                    )}
                </button>

                {/* Progress & Time */}
                <div className="flex-1 flex flex-col justify-center gap-2">
                    {/* Custom Range Slider */}
                    <div className="relative w-full h-1.5 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors duration-500 overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-[#4e7cce] rounded-full transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleSeek}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer active:cursor-grabbing"
                            aria-label="Seek"
                        />
                    </div>

                    <div className="flex justify-between items-center px-1">
                        <span className="font-mono text-[10px] font-medium text-slate-400 tabular-nums transition-colors duration-300 group-hover:text-slate-500">
                            {formatTime(currentTime)}
                        </span>
                        <span className="font-mono text-[10px] font-medium text-slate-400 tabular-nums transition-colors duration-300 group-hover:text-slate-500">
                            {formatTime(duration)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
