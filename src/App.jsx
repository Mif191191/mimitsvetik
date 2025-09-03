import React, { useEffect, useState } from "react";

// Форма лепестка
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

const BASE = import.meta.env.BASE_URL; // на GitHub Pages это "/mimitsvetik/"

export default function App() {
    const [petals, setPetals] = useState([]);

    // Загружаем список лепестков из public/petals.json
    useEffect(() => {
        const url = `${BASE}petals.json`; // 👈 правильный путь
        fetch(url)
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`)
