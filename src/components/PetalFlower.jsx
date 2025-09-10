import PropTypes from "prop-types";

export default function PetalFlower({
    petals,
    centerImage,
    baseD,
    onPetalClick,
    onCenterClick,
}) {
    const size = 800;
    const cx = size / 2;
    const cy = size / 2;

    // Center image circle radius
    const r = 120;

    // Label ring radius (outside the center circle)
    const labelRadius = r + 110;
    const toRad = (deg) => (deg * Math.PI) / 180;

    // Slight petal scale so petals don't touch the center image
    const petalScale = 0.94;

    return (
        <svg viewBox={`0 0 ${size} ${size}`} aria-label="Petal Flower">
            {/* Center image masked to a perfect circle, clickable */}
            {centerImage && (
                <>
                    <defs>
                        <clipPath id="centerCircleClip">
                            <circle cx={cx} cy={cy} r={r} />
                        </clipPath>
                    </defs>

                    <g
                        onClick={onCenterClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                            (e.key === "Enter" || e.key === " ") && onCenterClick?.(e)
                        }
                        style={{ cursor: "pointer" }}
                        aria-label="Play center recording"
                    >
                        <circle cx={cx} cy={cy} r={r} fill="#ddd" stroke="#444" />
                        <image
                            href={centerImage}
                            x={cx - r}
                            y={cy - r}
                            width={r * 2}
                            height={r * 2}
                            preserveAspectRatio="xMidYMid meet"
                            clipPath="url(#centerCircleClip)"
                        />
                    </g>
                </>
            )}

            {/* Petals */}
            {petals.map((p) => {
                const angle = Number(p.rotate || 0);

                // Label position in global coordinates (0° at top)
                const ax = Math.cos(toRad(angle - 90));
                const ay = Math.sin(toRad(angle - 90));
                const labelX = cx + labelRadius * ax;
                const labelY = cy + labelRadius * ay;

                const textAnchor = ax > 0.3 ? "start" : ax < -0.3 ? "end" : "middle";

                return (
                    <g
                        key={p.id}
                        onClick={() => onPetalClick?.(p)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                            (e.key === "Enter" || e.key === " ") && onPetalClick?.(p)
                        }
                        style={{ cursor: "pointer" }}
                        aria-label={p.label || "petal"}
                    >
                        {/* Rotate only the shape around the center; keep labels unrotated */}
                        <g transform={`rotate(${angle} ${cx} ${cy})`}>
                            <g
                                transform={`translate(${cx} ${cy}) scale(${petalScale}) translate(${-cx} ${-cy})`}
                            >
                                <path
                                    d={p.d || baseD}
                                    fill={p.fill || "#eee"}
                                    stroke="#222"
                                    strokeWidth="1.5"
                                />
                            </g>
                        </g>

                        {p.label && (
                            <text
                                x={labelX}
                                y={labelY}
                                textAnchor={textAnchor}
                                dominantBaseline="middle"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    pointerEvents: "none",
                                }}
                            >
                                {p.label}
                            </text>
                        )}
                    </g>
                );
            })}
        </svg>
    );
}

PetalFlower.propTypes = {
    petals: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            d: PropTypes.string, // optional; falls back to baseD
            fill: PropTypes.string,
            label: PropTypes.string,
            image: PropTypes.string,
            description: PropTypes.string,
            rotate: PropTypes.number, // degrees
        })
    ).isRequired,
    centerImage: PropTypes.string,
    baseD: PropTypes.string,
    onPetalClick: PropTypes.func,
    onCenterClick: PropTypes.func,
};
