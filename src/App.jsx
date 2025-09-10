import React from "react";
import FlowerV1FullInteractive from "./components/FlowerV1FullInteractive";
import AdminPanel from "./components/AdminPanel";

const LS_KEY = "mimitsvetik.linkSetId";

export default function App() {
    const B = import.meta.env.BASE_URL; // "/" in dev, "/mimitsvetik/" in build
    const [cfg, setCfg] = React.useState(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [adminOpen, setAdminOpen] = React.useState(false);

    // Load config
    React.useEffect(() => {
        fetch(`${B}data/app_config.json?v=201`)
            .then((r) => r.json())
            .then(setCfg)
            .catch((e) => console.error("Config load failed:", e));
    }, [B]);

    // Active set id (persisted)
    const [setId, setSetId] = React.useState(
        () => localStorage.getItem(LS_KEY) || null
    );
    React.useEffect(() => {
        if (!setId && cfg?.defaultSet) setSetId(cfg.defaultSet);
    }, [cfg, setId]);
    React.useEffect(() => {
        if (setId) localStorage.setItem(LS_KEY, setId);
    }, [setId]);

    if (!cfg || !setId) return <div style={{ padding: 16 }}>Loading…</div>;

    const linkSet = cfg.linkSets?.[setId] || { links: [] };
    // Build absolute (base-aware) links:
    const links = (linkSet.links || []).map(u => u.startsWith("http") ? u : `${B}${u}`);

    // Center menu actions
    function onCenterClick() { setMenuOpen(true); }
    function onMenuSelect(name) {
        setMenuOpen(false);
        if (name === "Admin") setAdminOpen(true);
        if (name === "Mia") {
            alert("Mia: Coming next…");
        }
    }

    // Petal fallback (no link) shows index
    function onPetalFallback(i) {
        alert(`Petal ${i + 1}`);
    }

    // ⬇️ Use your tuned overlay values here
    return (
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
            <FlowerV1FullInteractive
                size={1024}
                v={201}
                centerPct={0.18}
                rInnerPct={0.15}
                rOuterPct={0.445}
                offsetDeg={-77}
                offsetPctX={0.002}
                offsetPctY={0.000}
                showDebug={false}
                links={links}
                onPetal={onPetalFallback}
                onCenter={onCenterClick}
            />

            {/* Center menu: Mia / Admin */}
            {menuOpen && (
                <div
                    onClick={() => setMenuOpen(false)}
                    style={{
                        position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
                        display: "grid", placeItems: "center"
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "#fff", padding: "16px 20px", borderRadius: 12,
                            minWidth: 240, boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                            fontFamily: "system-ui, sans-serif"
                        }}
                    >
                        <h3 style={{ margin: "0 0 12px" }}>Menu</h3>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {cfg.centerMenu.map((name, idx) => (
                                <li
                                    key={name}
                                    onClick={() => onMenuSelect(name)}
                                    style={{
                                        padding: "10px 0",
                                        borderBottom: idx === 0 ? "1px solid #eee" : "none",
                                        cursor: "pointer"
                                    }}
                                >
                                    {name}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setMenuOpen(false)} style={{ marginTop: 12 }}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Admin set chooser */}
            {adminOpen && (
                <AdminPanel
                    sets={cfg.linkSets}
                    activeId={setId}
                    onCancel={() => setAdminOpen(false)}
                    onSave={(id) => { setSetId(id); setAdminOpen(false); }}
                />
            )}
        </div>
    );
}
