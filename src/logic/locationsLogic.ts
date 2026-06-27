import { ContentfulResponse } from "../types/ContentfulResponse";

// For route generation.
export async function getLocationIds() {
  const data = await getLocations();
  return data.items.map((i) => i.sys.id);
}

// Main data loader.
export async function getLocations() {
  const res = await fetch(process.env.API_URL!, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }

  return (await res.json()) as ContentfulResponse;
}

// For individual page rendering.
export async function getLocationById(id: string) {
  const data = await getLocations();
  return data.items.find((i) => i.sys.id === id);
}
