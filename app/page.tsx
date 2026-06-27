import { getContentfulLocations } from "@/src/logic/contentfulLogic";
import Image from "next/image";

export default async function HomePage() {
  const locations = await getContentfulLocations();

  return (
    <div className="w-full flex flex-wrap justify-center">
      {locations?.map((location) => (
        <div key={location.id}>
          <Image
            src={location.imageThumbUrl}
            alt={location.title}
            width={128}
            height={128}
            className="transition-transform duration-300 ease-out hover:scale-115"
          />
        </div>
      ))}
    </div>
  );
}
