"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MapContextType {
  activeStates: string[];
  regionName: string | undefined;
  setHighlight: (states: string[], name?: string) => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export function MapProvider({ children }: { children: ReactNode }) {
  const [activeStates, setActiveStates] = useState<string[]>([]);
  const [regionName, setRegionName] = useState<string | undefined>();

  const setHighlight = (states: string[], name?: string) => {
    setActiveStates(states);
    setRegionName(name);
  };

  return (
    <MapContext.Provider value={{ activeStates, regionName, setHighlight }}>
      {children}
    </MapContext.Provider>
  );
}

export function useMapContext() {
  const context = useContext(MapContext);
  if (!context)
    throw new Error("useMapContext must be used inside MapProvider");
  return context;
}
