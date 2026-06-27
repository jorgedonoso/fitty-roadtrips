import { IMAGE_SIZE, THUMBNAIL_IMAGE_SIZE } from "../config";
import { ContentfulAsset } from "../types/ContentfulAsset";
import { ContentfulItem } from "../types/ContentfulItem";
import { ContentfulResponse } from "../types/ContentfulResponse";
import { Location } from "../types/Location";
import { PhotoDictionary } from "../types/PhotoDictionary";
import { getLocations } from "./locationsLogic";

export const getContentfulLocations = async () => {
  const res: ContentfulResponse = await getLocations();

  const photosRaw: ContentfulAsset[] = res.includes.Asset;
  const photos = cleanUpRawPhotosDataset(photosRaw);

  const locations: Location[] = res.items.map(
    (contentfulRecord: ContentfulItem) => {
      return {
        id: contentfulRecord.sys.id,
        title: contentfulRecord.fields.title,
        city: contentfulRecord.fields.city,
        state: contentfulRecord.fields.state,
        coordinates: {
          lon: contentfulRecord.fields.coordinates.lon,
          lat: contentfulRecord.fields.coordinates.lat,
        },
        photoId: contentfulRecord.fields.photo.sys.id,
        imageUrl: photos[contentfulRecord.fields.photo.sys.id].url,
        imageThumbUrl: photos[contentfulRecord.fields.photo.sys.id].thumbnail,
      };
    },
  );

  return locations;
};

const cleanUpRawPhotosDataset = (rawPhotosDataset: ContentfulAsset[]) => {
  const dictionary: PhotoDictionary = rawPhotosDataset.reduce(
    (acc: PhotoDictionary, cur: ContentfulAsset) => {
      return {
        ...acc,
        [cur.sys.id]: {
          url: "https:" + cur.fields.file.url + `?h=${IMAGE_SIZE}`,
          thumbnail:
            "https:" +
            cur.fields.file.url +
            `?w=${THUMBNAIL_IMAGE_SIZE}&h=${THUMBNAIL_IMAGE_SIZE}&fit=thumb`,
        },
      };
    },
    {},
  );

  return dictionary;
};
