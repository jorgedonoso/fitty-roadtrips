export interface ContentfulItem {
  sys: { id: string };
  fields: {
    title: string;
    city: string;
    state: string;
    coordinates: {
      lon: number;
      lat: number;
    };
    photo: { sys: { id: string } };
  };
}
