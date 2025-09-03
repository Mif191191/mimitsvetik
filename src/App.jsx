import React, { useEffect, useState } from "react";

// рисуем форму лепестка
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

const BASE = import.meta.env.BASE_URL; // на GitHub Pages будет "/mimitsvetik/"

export default function App() {
    const [petals, setPetals] = useState([]);

    useEffect(() => {
        fetch(new URL("petals.json", BASE))
            .then((r) => r.json())
            .then(setPetals)
            .catch(() => alert("Не удалось прочитать public/petals.json"));
    }, []);

    const handlePetal = (file) => {
        const url = new URL(file, BASE).toString(); // корректный путь на GitHub Pages
        const opened = window.open(url, "_blank");
        if (!opened) alert("Не удалось открыть файл: " + url);
    };

    document.title = "Semitsvetik • 7 clickable petals";

    return (
        <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
            <h1>Semitsvetik — 7 clickable petals</h1>

            <svg viewBox="-200 -200 400 400" style={{ width: 460, border: "1px solid #ccc" }}>
                {/* центр */}
                <circle cx="0" cy="0" r="40" fill="#fff8c6" stroke="#333" strokeWidth="3" />

                {/* лепестки из JSON */}
                {petals.map((p, i) => {
                    const angle = (2 * Math.PI * i) / petals.length;
                    const d = petalPath({ angle });
                    return (
                        <g key={p.id} onClick={() => handlePetal(p.file)} style={{ cursor: "pointer" }}>
                            <path d={d} fill={p.color} stroke="#333" strokeWidth="2" />
                            <text
                                x={110 * Math.cos(angle)}
                                y={110 * Math.sin(angle)}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                style={{ fontSize: 10, fill: "#555", userSelect: "none" }}
                            >
                                {p.label}
                            </text>
                        </g>
                    );
                })}
            </svg>

            <div style={{ marginTop: 12, fontSize: 14 }}>
                Файлы лежат в <code>public/</code> и перечислены в <code>public/petals.json</code>.
            </div>
        </div>
    );
}
