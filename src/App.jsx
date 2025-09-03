import React, { useEffect, useState } from "react";

// Рисуем форму лепестка
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

// Абсолютная база для GitHub Pages
const REL = import.meta.env.BASE_URL || "/";           // например: "/mimitsvetik/"
const BASE = REL.startsWith("http") ? REL : (window.location.origin + REL);
// теперь BASE будет вида "https://mif191191.github.io/mimitsvetik/"

export default function App() {
    const [petals, setPetals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    // Грузим public/petals.json (с небольшим анти-кэш параметром)
    useEffect(() => {
        const url = `${BASE}petals.json?t=${Date.now()}`;
        fetch(url)
            .then(r => { if (!r.ok) throw new Error(`petals.json HTTP ${r.status}`); return r.json(); })
            .then(data => setPetals(Array.isArray(data) ? data : []))
            .catch(e => setErr(String(e)))
            .finally(() => setLoading(false));
    }, []);

    const openFile = (file) => {
        const url = `${BASE}${file}`; // корректный путь на Pages
        const w = window.open(url, "_blank", "noopener,noreferrer");
        if (!w) alert("Не удалось открыть: " + url);
    };

    document.title = "Semitsvetik • clickable petals";

    return (
        <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
            {loading && <div style={{ background: "#fff3cd", border: "1px solid #eedc82", padding: 8, marginBottom: 8 }}>Загружаю…</div>}
            {!!err && <div style={{ background: "#fdecea", border: "1px solid #f5c6cb", padding: 8, marginBottom: 8 }}>Ошибка: {err}</div>}

            <h1>Semitsvetik — clickable petals</h1>

            <svg viewBox="-200 -200 400 400" style={{ width: 460, border: "1px solid #ccc" }}>
                <circle cx="0" cy="0" r="40" fill="#fff8c6" stroke="#333" strokeWidth="3" />
                {petals.map((p, i) => {
                    const angle = (2 * Math.PI * i) / petals.length;
                    const d = petalPath({ angle });
                    return (
                        <g key={p.id || i} onClick={() => openFile(p.file)} style={{ cursor: "pointer" }}>
                            <path d={d} fill={p.color || "rgba(255,99,132,0.35)"} stroke="#333" strokeWidth="2" />
                            <text
                                x={110 * Math.cos(angle)}
                                y={110 * Math.sin(angle)}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                style={{ fontSize: 10, fill: "#555", userSelect: "none" }}
                            >
                                {p.label || "Petal"}
                            </text>
                        </g>
                    );
                })}
            </svg>

            <div style={{ marginTop: 12, fontSize: 14 }}>
                Файлы — в <code>public/</code>, список — в <code>public/petals.json</code>.
            </div>
        </div>
    );
}
