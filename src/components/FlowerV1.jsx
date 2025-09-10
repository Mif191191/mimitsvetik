// src/components/FlowerV1.jsx
export default function FlowerV1({ size = 1024, v = 101 }) {
    // WHY: in dev this is "/", in the built site it's "/mimitsvetik/"
    const base = import.meta.env.BASE_URL;

    // WHY: we keep the filename pattern consistent and use a cache-buster (?v=)
    return (
        <img
            src={`${base}flower_v1_${size}.png?v=${v}`}
            alt="Mimitsvetik flower"
            style={{ width: "100%", height: "auto", display: "block" }}
        />
    );
}
