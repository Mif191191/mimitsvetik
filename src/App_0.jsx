export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Semitsvetik test</h1>
      <svg viewBox="-200 -200 400 400" style={{ width: 400, border: "1px solid #ccc" }}>
        <circle cx="0" cy="0" r="40" fill="#fff8c6" stroke="#333" strokeWidth="3" />
        {[...Array(7)].map((_, i) => {
          const angle = (2 * Math.PI * i) / 7;
          const bx = 40 * Math.cos(angle), by = 40 * Math.sin(angle);
          const tx = 160 * Math.cos(angle), ty = 160 * Math.sin(angle);
          const c1x = 120 * Math.cos(angle + 0.6), c1y = 120 * Math.sin(angle + 0.6);
          const c2x = 120 * Math.cos(angle - 0.6), c2y = 120 * Math.sin(angle - 0.6);
          const d = `M ${bx},${by} Q ${c1x},${c1y} ${tx},${ty} Q ${c2x},${c2y} ${bx},${by} Z`;
          return <path key={i} d={d} fill="rgba(135,206,250,0.3)" stroke="#333" strokeWidth="2" />;
        })}
      </svg>
      <p>If you can see petals and a center circle, React is rendering correctly.</p>
    </div>
  );
}

