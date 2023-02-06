import { MediaModel } from "../Media/Media";

export class CartItemsModel {
  isSelected = false;
  constructor({
    id,
    productID,
    name,
    quantity,
    price,
    discount,
    images,
    createTime,
    updateTime,
  }) {
    this.id = id;
    this.productID = productID;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.discount = discount;
    this.discountPrice = price - (discount / 100).toFixed(2) * price;
    this.images = images;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }
  getDiscountPrice = () =>
    this.price - (this.discount / 100).toFixed(2) * this.price;
}
