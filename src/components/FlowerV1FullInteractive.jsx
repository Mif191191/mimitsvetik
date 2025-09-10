import { useState } from "react";

function deg2rad(d) { return (d * Math.PI) / 180; }

/** Donut-slice wedge path between angles a0..a1, inner radius ri, outer radius ro. */
function wedgePath(cx, cy, ri, ro, a0deg, a1deg) {
    const a0 = deg2rad(a0deg), a1 = deg2rad(a1deg);
    const large = (Math.abs(a1deg - a0deg) > 180) ? 1 : 0;

    const x0o = cx + ro * Math.cos(a0), y0o = cy + ro * Math.sin(a0);
    const x1o = cx + ro * Math.cos(a1), y1o = cy + ro * Math.sin(a1);
    const x1i = cx + ri * Math.cos(a1), y1i = cy + ri * Math.sin(a1);
    const x0i = cx + ri * Math.cos(a0), y0i = cy + ri * Math.sin(a0);

    return [
        `M ${x0o} ${y0o}`,
        `A ${ro} ${ro} 0 ${large} 1 ${x1o} ${y1o}`,
        `L ${x1i} ${y1i}`,
        `A ${ri} ${ri} 0 ${large} 0 ${x0i} ${y0i}`,
        `Z`,
    ].join(" ");
}

/**
 * Full interactive flower:
 * - shows background PNG
 * - overlays your center PNG (masked to a perfect circle)
 * - clickable center + 7 clickable petals (SVG overlay)
 */
export default function FlowerV1FullInteractive({
    size = 1024,
    v = 101,                 // cache-buster for flower PNG
    centerPct = 0.18,        // width of center image relative to full image
    offsetDeg = -90,         // rotate so petal 1 starts at the top
    rInnerPct = 0.16,        // inner radius for wedges (relative to size)
    rOuterPct = 0.46,        // outer radius for wedges
    links = [],              // optional array of 7 URLs (one per petal)
    onPetal = (i) => alert(`Petal ${i + 1} clicked`),
    onCenter = () => alert("Center clicked"),
    offsetPctX = 0,          // fine-adjust center image in X (+ right / − left)
    offsetPctY = 0,          // fine-adjust center image in Y (+ down / − up)
    showDebug = false,       // show outlines while tuning
}) {
    const base = import.meta.env.BASE_URL; // "/" in dev, "/mimitsvetik/" in build
    const PETALS = 7;
    const step = 360 / PETALS;

    const [hoverPetal, setHoverPetal] = useState(-1);
    const [hoverCenter, setHoverCenter] = useState(false);

    const cx = size / 2 + size * offsetPctX;
    const cy = size / 2 + size * offsetPctY;

    const rInner = size * rInnerPct;
    const rOuter = size * rOuterPct;

    const centerW = size * centerPct;     // visual width of center image
    const centerR = centerW / 2;          // clickable radius matches visual

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: size }}>
            {/* Background flower image */}
            <img
                src={`${base}flower_v1_${size}.png?v=${v}`}
                alt="Mimitsvetik flower"
                style={{ width: "100%", height: "auto", display: "block" }}
            />

            {/* REAL center image, masked to a perfect circle and centered */}
            <img
                src={`${base}center_v1.png`}
                alt="Center"
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(-50%, -50%) translate(${offsetPctX * 100}%, ${offsetPctY * 100}%)`,
                    width: `${centerPct * 100}%`,
                    height: "auto",
                    borderRadius: "50%",           // circular crop
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.2)", // subtle ring
                    pointerEvents: "none",         // clicks handled by SVG
                    userSelect: "none",
                }}
            />

            {/* SVG overlay for interactivity */}
            <svg
                viewBox={`0 0 ${size} ${size}`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
                {/* Optional debug circles */}
                {showDebug && (
                    <>
                        <circle cx={cx} cy={cy} r={centerR} fill="none" stroke="rgba(0,0,0,0.3)" strokeDasharray="6 6" />
                        <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="rgba(0,0,255,0.25)" />
                        <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="rgba(255,0,0,0.25)" />
                    </>
                )}

                {/* Petal wedges */}
                {Array.from({ length: PETALS }).map((_, i) => {
                    const a0 = offsetDeg + i * step;
                    const a1 = offsetDeg + (i + 1) * step;
                    const d = wedgePath(cx, cy, rInner, rOuter, a0, a1);
                    const isH = hoverPetal === i;

                    return (
                        <path
                            key={i}
                            d={d}
                            fill={isH ? "rgba(0,0,0,0.10)" : "transparent"}
                            stroke={isH ? "rgba(0,0,0,0.35)" : "transparent"}
                            strokeWidth={isH ? 2 : 1}
                            style={{ cursor: "pointer" }}
                            onMouseEnter={() => setHoverPetal(i)}
                            onMouseLeave={() => setHoverPetal(-1)}
                            onClick={() => {
                                const url = links[i];
                                if (url) {
                                    // open in same tab; use '_blank' if you prefer new tab
                                    window.open(url, "_self");
                                } else {
                                    onPetal(i);
                                }
                            }}
                            aria-label={`Petal ${i + 1}`}
                        />
                    );
                })}

                {/* Center hotspot */}
                <circle
                    cx={cx}
                    cy={cy}
                    r={centerR}
                    fill={hoverCenter ? "rgba(0,0,0,0.08)" : "transparent"}
                    stroke={hoverCenter ? "rgba(0,0,0,0.35)" : "transparent"}
                    strokeWidth={hoverCenter ? 3 : 2}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoverCenter(true)}
                    onMouseLeave={() => setHoverCenter(false)}
                    onClick={() => onCenter()}
                    aria-label="Center button"
                />
            </svg>
        </div>
    );
}
