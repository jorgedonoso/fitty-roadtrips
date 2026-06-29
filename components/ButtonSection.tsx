"use client";

import { useMapContext } from "@/src/context/MapContext";
import { regions } from "@/src/data/regions";

export default function ButtonSection() {
  const { regionName, setHighlight } = useMapContext();

  return (
    <section className="flex flex-wrap items-center justify-center gap-3 p-3">
      {regions.map((r) => (
        <button
          key={r.slug}
          onClick={() => setHighlight(r.states, r.name)}
          className={`rounded px-5 py-3 text-white font-medium transition-colors ${
            regionName === r.name
              ? "bg-blue-700 ring-2 ring-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {r.name}
        </button>
      ))}
    </section>
  );
}
