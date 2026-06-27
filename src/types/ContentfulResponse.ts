import { ContentfulAsset } from "./ContentfulAsset";
import { ContentfulItem } from "./ContentfulItem";

/**
 * Core response by Contentful.
 */
export interface ContentfulResponse {
  items: ContentfulItem[];
  includes: { Asset: ContentfulAsset[] };
}
