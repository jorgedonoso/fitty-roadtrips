"use client";

import RegionGallery from "@/components/domain/RegionGallery";
import { useMapContext } from "@/src/context/MapContext";
import Image from "next/image";

export default function GallerySection() {
  const { regionName } = useMapContext();

  return (
    <section className="flex-1 overflow-auto">
      {regionName ? (
        <RegionGallery name={regionName} />
      ) : (
        <div className="flex flex-col items-center justify-start gap-2 pt-5 text-center text-gray-400">
          <p className="text-xl font-mono tracking-widest">
            Select a region to start exploring
          </p>
          <Image
            src="/intro.png"
            alt="Home illustration"
            width={556}
            height={368}
            className="h-auto max-h-[368px] w-auto"
          />
        </div>
      )}
    </section>
  );
}
