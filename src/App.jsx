import React from "react";

// Simple petal path (same shape for each, rotated by angle)
function petalPath({ angle, innerR = 40, outerR = 160, width = 120 }) {
    const bx = innerR * Math.cos(angle);
    const by = innerR * Math.sin(angle);
    const tx = outerR * Math.cos(angle);
    const ty = outerR * Math.sin(angle);
    const c1x = width * Math.cos(angle + 0.6);
    const c1y = width * Math.sin(angle + 0.6);
    const c2x = width * Math.cos(angle - 0.6);
    const c2y = width * Math.sin(angle - 0.6);
    return `M ${bx},${by} Q ${c1x},${c1y} ${tx},${ty} Q ${c2x},${c2y} ${bx},${by} Z`;
}

const PETALS = [
    { id: "red", label: "Red", color: "rgba(255, 99, 132, 0.35)" },
    { id: "orange", label: "Orange", color: "rgba(255, 165, 0, 0.55)" },
    { id: "yellow", label: "Yellow", color: "rgba(255, 221, 87, 0.35)" },
    { id: "green", label: "Green", color: "rgba(52, 211, 153, 0.35)" },
    { id: "lightblue", label: "Light Blue", color: "rgba(96, 165, 250, 0.35)" },
    { id: "darkblue", label: "Dark Blue", color: "rgba(59, 130, 246, 0.35)" },
    { id: "violet", label: "Violet", color: "rgba(167, 139, 250, 0.35)" },
];

// 🔗 Configure what each petal opens (paths are relative to /public)
const PETAL_LINKS = {
    red: "/red.jpeg",           // change to your real filename
    orange: "/who_is_it.jpeg",    // your existing image
    yellow: "/yellow.jpeg",
    green: "/lisichka.jpg",
    lightblue: "/lightblue.png",
    darkblue: "/darkblue.jpg",
    violet: "/violet.jpeg",
};

export default function App() {
    document.title = "Semitsvetik • 7 clickable petals";

    const handlePetal = (id) => {
        const url = PETAL_LINKS[id];
        if (!url) {
            alert(`No link configured for ${id} petal yet.`);
            return;
        }
        const opened = window.open(url, "_blank");
        if (!opened) {
            alert(`Could not open ${url}. If it’s in the project, place the file inside /public and try again.`);
        }
    };

    return (
        <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
            <h1>Semitsvetik — 7 clickable petals</h1>
            <svg viewBox="-200 -200 400 400" style={{ width: 460, border: "1px solid #ccc" }}>
                {/* center */}
                <circle cx="0" cy="0" r="40" fill="#fff8c6" stroke="#333" strokeWidth="3" />
                {/* petals */}
                {PETALS.map((p, i) => {
                    const angle = (2 * Math.PI * i) / PETALS.length;
                    const d = petalPath({ angle });
                    return (
                        <g key={p.id} onClick={() => handlePetal(p.id)} style={{ cursor: "pointer" }}>
                            <path d={d} fill={p.color} stroke="#333" strokeWidth="2" />
                            <text
                                x={110 * Math.cos(angle)} y={110 * Math.sin(angle)}
                                textAnchor="middle" dominantBaseline="middle"
                                style={{ fontSize: 10, fill: "#555", userSelect: "none" }}
                            >
                                {p.label}
                            </text>
                        </g>
                    );
                })}
            </svg>

            <div style={{ marginTop: 12, fontSize: 14 }}>
                <div>• Files must be placed in <code>public/</code> (e.g., <code>public/red.jpg</code>).</div>
                <div>• Click a petal to open its file in a new tab. Orange uses your <code>who_is_it.jpeg</code>.</div>
            </div>
        </div>
    );
}
