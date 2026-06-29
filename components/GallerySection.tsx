"use client";

import RegionGallery from "@/components/domain/RegionGallery";
import { useMapContext } from "@/src/context/MapContext";

export default function GallerySection() {
  const { regionName } = useMapContext();

  return (
    <section className="flex-1 overflow-auto">
      {regionName ? (
        <RegionGallery name={regionName} />
      ) : (
        <div className="flex h-full items-center justify-center text-gray-400 italic">
          Select a region to explore galleries.
        </div>
      )}
    </section>
  );
}
