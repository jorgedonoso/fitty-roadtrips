import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { GeoJsonObject } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { regions } from "@/src/data/regions";
import { useMapContext } from "@/src/context/MapContext";
interface OpenStreetMapProps {
  highlightedStates: string[];
}

export default function OpenStreetMap({
  highlightedStates,
}: OpenStreetMapProps) {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);
  const { setHighlight } = useMapContext();

  // Reverse lookup for hovered state to region.
  const stateToRegion = useMemo(() => {
    const map: Record<string, (typeof regions)[number]> = {};

    regions.forEach((region) => {
      region.states.forEach((state) => {
        map[state.toLowerCase()] = region;
      });
    });

    return map;
  }, []);

  // Load state shapes.
  useEffect(() => {
    fetch("/us-states.json")
      .then((res) => {
        if (!res.ok) throw new Error("Missing states boundaries file");
        return res.json();
      })
      .then((data) => setGeoJsonData(data))
      .catch((err) => console.error("Error states boundaries file:", err));
  }, []);

  // Highlight states effect.
  useEffect(() => {
    if (!geoJsonRef.current) return;

    const selectedStates = new Set(
      highlightedStates.map((s) => s.toLowerCase()),
    );

    geoJsonRef.current.eachLayer((layer: any) => {
      const stateName = layer.feature?.properties?.name?.trim().toLowerCase();
      const isSelected = selectedStates.has(stateName);
      const isHovered =
        hoveredRegion !== null &&
        stateToRegion[stateName]?.name === hoveredRegion;

      layer.setStyle({
        fillColor: isSelected ? "#2563eb" : isHovered ? "#93c5fd" : "#ffffff",
        fillOpacity: isSelected ? 0.7 : isHovered ? 0.5 : 0,
        color: "#666",
        weight: 1,
      });
    });
  }, [highlightedStates, hoveredRegion, stateToRegion]);

  return (
    <div className="h-full w-full">
      <div className="relative h-full w-full">
        {hoveredRegion && (
          <div className="absolute left-1/2 top-4 z-1000 -translate-x-1/2 rounded bg-white/90 px-4 py-2 shadow-lg">
            <span className="text-lg font-semibold">{hoveredRegion}</span>
          </div>
        )}
        <MapContainer
          center={[39.5, -98.35]}
          zoom={3}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {geoJsonData && (
            <GeoJSON
              ref={geoJsonRef}
              data={geoJsonData}
              style={{
                color: "#666",
                weight: 1,
                fillColor: "#ffffff",
                fillOpacity: 0,
              }}
              onEachFeature={(feature, layer) => {
                layer.on({
                  mouseover: () => {
                    const state = feature.properties.name.trim().toLowerCase();
                    setHoveredRegion(stateToRegion[state]?.name ?? null);
                  },
                  mouseout: () => {
                    setHoveredRegion(null);
                  },
                  click: () => {
                    const state = feature.properties.name.trim().toLowerCase();
                    const region = stateToRegion[state];

                    if (region) {
                      setHighlight(region.states, region.name);
                    }
                  },
                });
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
