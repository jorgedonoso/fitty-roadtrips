export interface ILocation {
  id: string;
  title: string;
  city: string;
  state: string;
  coordinates: {
    lon: number;
    lat: number;
  };
  photoId: string;
  imageUrl: string;
  imageThumbUrl: string;
}
