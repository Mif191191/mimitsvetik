import { useState } from "react";

export default function FlowerV1CenterClickable({
    size = 1024,
    v = 101,
    radiusPct = 0.08,                 // circle radius as % of image width (0.08 = 8%)
    showCircle = true,                // NEW: show a visible center circle
    circleColor = "rgba(255,255,255,0.92)", // NEW: circle fill (slightly translucent)
    circleBorder = "1px solid rgba(0,0,0,0.20)", // NEW: subtle border
    onCenter = () => alert("Center clicked"),
}) {
    const base = import.meta.env.BASE_URL; // "/" in dev, "/mimitsvetik/" in build
    const cx = size / 2, cy = size / 2;
    const r = size * radiusPct;

    const [hover, setHover] = useState(false);

    // Convert radius (%) to diameter (%) for the visual circle
    const diameterPct = radiusPct * 2 * 100;

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: size }}>
            {/* background flower (PNG) */}
            <img
                src={`${base}flower_v1_${size}.png?v=${v}`}
                alt="Mimitsvetik flower"
                style={{ width: "100%", height: "auto", display: "block" }}
            />

            {/* visible center circle (purely visual) */}
            {showCircle && (
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: `${diameterPct}%`,
                        aspectRatio: "1 / 1",
                        borderRadius: "50%",            // <-- makes it a perfect circle
                        background: circleColor,
                        border: circleBorder,
                        pointerEvents: "none",          // clicks handled by SVG below
                    }}
                />
            )}

            {/* SVG overlay for hover + click */}
            <svg
                viewBox={`0 0 ${size} ${size}`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
                <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={hover ? "rgba(0,0,0,0.08)" : "transparent"}
                    stroke={hover ? "rgba(0,0,0,0.35)" : "transparent"}
                    strokeWidth={hover ? 3 : 2}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={onCenter}
                    aria-label="Center button"
                />
            </svg>
        </div>
    );
}
