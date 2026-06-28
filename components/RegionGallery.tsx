"use client";

import { useEffect, useState } from "react";
import { regions } from "@/src/data/regions";
import { getContentfulLocations } from "@/src/logic/contentfulLogic";
import { filterLocationsByRegion } from "@/src/logic/locationsLogic";
import { Gallery } from "./Gallery";

export default function RegionGallery({ name }: { name: string }) {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const all = await getContentfulLocations();
      const filtered = filterLocationsByRegion(all, regions, name);
      setLocations(filtered);
    }

    load();
  }, [name]);

  return (
    <div>
      <Gallery locations={locations} />
    </div>
  );
}
