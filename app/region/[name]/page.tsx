import { Gallery } from "@/components/Gallery";
import { regions } from "@/src/data/regions";
import { getContentfulLocations } from "@/src/logic/contentfulLogic";
import { filterLocationsByRegion } from "@/src/logic/locationsLogic";
import Link from "next/link";

type Props = {
  params: {
    name: string;
  };
};

export default async function RegionPage({ params }: Props) {
  const _params = await params;
  const regionSlug = _params.name;

  const locations = await getContentfulLocations();
  const regionLocations = filterLocationsByRegion(
    locations,
    regions,
    regionSlug,
  );

  return (
    <div className="h-screen flex flex-col">
      <Gallery locations={regionLocations} />
      <div className="shrink-0 p-4 relative text-center">
        <Link href="/" className="underline">
          Go Back
        </Link>
      </div>
    </div>
  );
}
