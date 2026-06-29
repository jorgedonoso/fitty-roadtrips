import { Location } from "@/src/types/Location";
import Image from "next/image";

export function Gallery({ locations }: { locations: Location[] }) {
  return (
    <div className="w-full flex flex-wrap justify-center gap-8 p-6">
      {locations?.map((location, index) => {
        // Alternate rotation.
        const rotation = index % 2 === 0 ? -2 : 2;

        return (
          <div
            key={location.id}
            style={{ transform: `rotate(${rotation}deg)` }}
            className="bg-white p-4 shadow-lg w-65
                       transition-all duration-300 ease-out
                       hover:shadow-xl hover:scale-105"
          >
            <div className="overflow-hidden bg-gray-100">
              <Image
                src={location.imageThumbUrl}
                alt={location.title}
                width={256}
                height={256}
                className="object-cover w-full h-55"
              />
            </div>

            <div className={`text-center pt-4 font-polaroid`}>
              <p className="text-sm uppercase tracking-widest text-gray-600">
                {location.title}
              </p>
              <p className="text-xs text-gray-400">
                {location.city}, {location.state}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
