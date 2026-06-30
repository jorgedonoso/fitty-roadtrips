"use client";

import RegionGallery from "@/components/domain/RegionGallery";
import { useMapContext } from "@/src/context/MapContext";

export default function GallerySection() {
  const { regionName } = useMapContext();

  return (
    <section className="flex-1 overflow-auto">
      <RegionGallery name={regionName} />
    </section>
  );
}
