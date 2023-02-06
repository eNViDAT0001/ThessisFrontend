import { DEFAULT_PRODUCT_MEDIA } from "../../dummy_database/MediaDummyDB";

export class ProductModel {
  media = [DEFAULT_PRODUCT_MEDIA];
  constructor({ id, name, price, discount, media, rating }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.discount = discount;
    this.media = media;
    this.rating = rating;
  }
  getDiscountPrice = () => this.price - (this.discount / 100).toFixed(2) * this.price;
}