import { MediaModel } from "../Media/Media";
import { CartItemsModel } from "./CartItems";

export class CartModel {
  isSelected = false;
  cartItems = [
    new CartItemsModel({
      id: 0,
      discount: 0,
      images: new MediaModel({ id: 0, src: "" }),
    }),
  ];
  constructor({ id, providerID, providerName, cartItems }) {
    this.id = id;
    this.providerName = providerName;
    this.providerID = providerID;
    if (cartItems) this.cartItems = cartItems
  }
}
