"use client";

import { useMapContext } from "@/src/context/MapContext";
import dynamic from "next/dynamic";

// Turn off ssr because Leaflet+OpenStreet require browser api.
const OpenStreetMap = dynamic(() => import("./domain/OpenStreetMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
      Loading OpenStreetMap...
    </div>
  ),
});

export default function MapSection() {
  const { activeStates } = useMapContext();

  return (
    <section className="h-[40vh] w-full">
      <OpenStreetMap highlightedStates={activeStates} />
    </section>
  );
}
