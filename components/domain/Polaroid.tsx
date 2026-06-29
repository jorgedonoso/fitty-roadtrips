import { Location } from "@/src/types/Location";
import Image from "next/image";

export function Polaroid({
  location,
  isModal,
}: {
  location: Location;
  isModal: boolean;
}) {
  const photo = isModal
    ? {
        photoSize: 1080,
        photoUrl: location.imageUrl,
        containerClass:
          "cursor-pointer relative max-w-4xl w-full m-6 p-6 shadow-lg bg-white",
        titleClass: "text-4xl",
        subTitleClass: "text-2xl mb-6",
        imageClass: "w-full h-auto object-contain shadow-2xl",
      }
    : {
        photoSize: 256,
        photoUrl: location.imageThumbUrl,
        containerClass:
          "cursor-pointer bg-white p-4 shadow-lg w-65 transition-all duration-300 ease-out hover:shadow-xl hover:scale-105",
        titleClass: "text-sm",
        subTitleClass: "text-xs pb-3",
        imageClass: "w-full h-55 object-cover",
      };

  const {
    photoSize,
    photoUrl,
    containerClass,
    titleClass,
    subTitleClass,
    imageClass,
  } = photo;

  return (
    <div className={containerClass}>
      <div className="overflow-hidden bg-gray-100">
        <Image
          src={photoUrl}
          alt={location.title}
          width={photoSize}
          height={photoSize}
          className={imageClass}
        />
      </div>

      <div className="text-center pt-4 font-polaroid">
        <p className={`${titleClass} uppercase tracking-widest text-gray-600`}>
          {location.title}
        </p>
        <p className={`${subTitleClass} text-gray-400`}>
          {location.city}, {location.state}
        </p>
      </div>
    </div>
  );
}
