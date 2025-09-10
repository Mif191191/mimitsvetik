import FlowerV1FullInteractive from "./components/FlowerV1FullInteractive";

export default function App() {
    // Example: plug links per petal (replace with your real pages later)
    const petalLinks = [
        "", // 1: empty -> will fallback to onPetal alert
        "", // 2
        "", // 3
        "", // 4
        "", // 5
        "", // 6
        ""  // 7
        // e.g., `${import.meta.env.BASE_URL}pages/yellow.html`
    ];

    return (
        <div style={{ maxWidth: 1024, margin: "0 auto" }}>
            <FlowerV1FullInteractive
                size={1024}
                v={101}
                centerPct={0.18}
                rInnerPct={0.16}
                rOuterPct={0.46}
                offsetDeg={-90}
                offsetPctX={0.00}
                offsetPctY={0.00}
                showDebug={true}       // turn off after alignment
                links={petalLinks}     // fill with URLs when you have them
                onPetal={(i) => alert(`Petal ${i + 1} clicked`)}
                onCenter={() => alert("Center clicked")}
            />
        </div>
    );
}
