import { useRef, useCallback } from "react";

/**
 * Simple audio player with optional fallback (e.g., opus -> mp3 for Safari).
 * Usage: playList(['/a.opus','/a.mp3'])
 */
export default function useAudioPlayer() {
    const audioRef = useRef(null);

    const ensureEl = () => {
        if (!audioRef.current) {
            const el = document.createElement("audio");
            el.preload = "none";
            el.style.display = "none";
            document.body.appendChild(el);
            audioRef.current = el;
        }
        return audioRef.current;
    };

    const canPlay = (url) => {
        const el = ensureEl();
        const ext = url.split(".").pop().toLowerCase();
        if (ext === "mp3") return !!el.canPlayType("audio/mpeg");
        if (ext === "opus")
            return (
                !!el.canPlayType('audio/ogg; codecs="opus"') ||
                !!el.canPlayType('audio/webm; codecs="opus"')
            );
        if (ext === "wav") return !!el.canPlayType("audio/wav");
        return true;
    };

    const playList = useCallback(async (urls) => {
        const el = ensureEl();
        for (const url of urls) {
            if (!url) continue;
            if (!canPlay(url)) continue;
            try {
                if (el.src !== url) el.src = url;
                await el.play();
                return true; // success
            } catch {
                // try next candidate
            }
        }
        console.warn("No compatible audio source could be played.");
        return false;
    }, []);

    return { playList };
}
