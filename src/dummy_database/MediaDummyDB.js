import { MediaModel } from "../models/Media/Media";
import { ProductMediaModel } from "../models/Media/ProductMedia";
const DEFAULT_IMAGE_1 =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
const DEFAULT_IMAGE_2 =
  "https://st2.depositphotos.com/1031343/5599/v/950/depositphotos_55990397-stock-illustration-top-product-stamp.jpg";
export const DEFAULT_MEDIA = new MediaModel({id: 0, src: DEFAULT_IMAGE_1})
export const DEFAULT_PRODUCT_MEDIA = new ProductMediaModel({id: 0, src: DEFAULT_IMAGE_1, priority: 1})