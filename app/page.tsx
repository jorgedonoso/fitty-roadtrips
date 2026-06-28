"use client";

import { useEffect, useRef, useState } from "react";
import { regions } from "@/src/data/regions";
import RegionGallery from "@/components/RegionGallery";

export default function MapClient() {
  const mapDiv = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const polygons = useRef<Map<string, google.maps.Polygon[]>>(new Map());
  const [regionName, setRegionName] = useState<string | undefined>();

  useEffect(() => {
    const waitForGoogle = () => {
      if (!window.google?.maps) {
        requestAnimationFrame(waitForGoogle);
        return;
      }

      initMap();
    };

    waitForGoogle();
  }, []);

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    const map = new Map(mapDiv.current!, {
      center: { lat: 42.5, lng: -98.35 },
      zoom: 3,
      disableDefaultUI: true,
    });

    mapRef.current = map;

    const geojson = await fetch("/us-states.json").then((r) => r.json());

    for (const feature of geojson.features) {
      const state = feature.properties.name.trim().toLowerCase();

      if (!polygons.current.has(state)) {
        polygons.current.set(state, []);
      }

      const geom = feature.geometry;

      const add = (coords: number[][][]) => {
        const path = coords[0].map(([lng, lat]) => ({
          lat,
          lng,
        }));

        const polygon = new google.maps.Polygon({
          paths: path,
          strokeColor: "#666",
          strokeWeight: 1,
          fillColor: "#d1d5db",
          fillOpacity: 0.25,
          map,
        });

        polygons.current.get(state)!.push(polygon);
      };

      if (geom.type === "Polygon") add(geom.coordinates);
      if (geom.type === "MultiPolygon") {
        for (const poly of geom.coordinates) add(poly);
      }
    }
  }

  function reset() {
    polygons.current.forEach((list) => {
      list.forEach((p) =>
        p.setOptions({
          fillColor: "#d1d5db",
          fillOpacity: 0.25,
        }),
      );
    });
  }

  function highlight(states: string[], slug?: string) {
    reset();
    setRegionName(slug);

    states.forEach((state) => {
      const key = state.trim().toLowerCase();
      const list = polygons.current.get(key);

      list?.forEach((p) =>
        p.setOptions({
          fillColor: "#2563eb",
          fillOpacity: 0.7,
        }),
      );
    });
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="h-[30vh] w-full">
        <div ref={mapDiv} className="h-full w-full" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 p-3">
        {regions.map((r) => (
          <button
            key={r.slug}
            onClick={() => highlight(r.states, r.name)}
            className="rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            {r.name}
          </button>
        ))}

        <button
          onClick={() => highlight([])}
          className="rounded bg-gray-600 px-5 py-3 text-white hover:bg-gray-700"
        >
          Clear
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {regionName && <RegionGallery name={regionName} />}
      </div>
    </div>
  );
}
