export default function AdminPanel({ sets, activeId, onSave, onCancel }) {
    const [sel, setSel] = React.useState(activeId);

    return (
        <div
            onClick={onCancel}
            style={{
                position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
                display: "grid", placeItems: "center"
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "#fff", padding: "16px 20px", borderRadius: 12,
                    minWidth: 280, boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                    fontFamily: "system-ui, sans-serif"
                }}
            >
                <h3 style={{ marginTop: 0 }}>Admin: choose link set</h3>
                <div style={{ display: "grid", gap: 8 }}>
                    {Object.entries(sets).map(([id, s]) => (
                        <label key={id} style={{ cursor: "pointer" }}>
                            <input
                                type="radio"
                                name="set"
                                value={id}
                                checked={sel === id}
                                onChange={() => setSel(id)}
                            />{" "}
                            {s.label || id}
                        </label>
                    ))}
                </div>

                <div style={{ marginTop: 14, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={() => onSave(sel)}>Save</button>
                </div>
            </div>
        </div>
    );
}
