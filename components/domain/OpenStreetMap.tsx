import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { GeoJsonObject } from "geojson";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface OpenStreetMapProps {
  highlightedStates: string[];
}

export default function OpenStreetMap({
  highlightedStates,
}: OpenStreetMapProps) {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null);
  const geoJsonRef = useRef<L.GeoJSON | null>(null);

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

    geoJsonRef.current.eachLayer((layer: any) => {
      const stateName = layer.feature?.properties?.name?.trim().toLowerCase();
      const isMatch = highlightedStates
        .map((s) => s.toLowerCase())
        .includes(stateName);

      layer.setStyle({
        fillColor: isMatch ? "#2563eb" : "#ffffff",
        fillOpacity: isMatch ? 0.7 : 0,
        color: "#666",
        weight: 1,
      });
    });
  }, [highlightedStates, geoJsonData]);

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[39.5, -98.35]}
        zoom={3}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoJsonData && (
          <GeoJSON
            ref={geoJsonRef}
            data={geoJsonData}
            style={{
              color: "#666",
              weight: 1,
              fillColor: "#d1d5db",
              fillOpacity: 0.25,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
