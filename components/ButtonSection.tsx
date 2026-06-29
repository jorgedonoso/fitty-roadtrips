"use client";

import { useMapContext } from "@/src/context/MapContext";
import { regions } from "@/src/data/regions";

export default function ButtonSection() {
  const { regionName, setHighlight } = useMapContext();

  return (
    <section className="flex flex-wrap items-center justify-center gap-3 p-3 font-mono text-white font-bold">
      {regions.map((r) => (
        <button
          key={r.slug}
          onClick={() => setHighlight(r.states, r.name)}
          className={`rounded px-5 py-2 cursor-pointer ${
            regionName === r.name
              ? "bg-primary"
              : "bg-zinc-400 hover:opacity-80"
          }`}
        >
          {r.name}
        </button>
      ))}
    </section>
  );
}
