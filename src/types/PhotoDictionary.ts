type Photo = { url: string; thumbnail: string };

export type PhotoDictionary = {
  [photoId: string]: Photo;
};
