export class NotificationModel {
  constructor({ id, srcID, title, content, descriptions, seen, trash, type }) {
    this.id = id;
    this.srcID = srcID;
    this.title = title;
    this.content = content;
    this.descriptions = descriptions;
    this.seen = seen;
    this.trash = trash;
    this.type = type;
  }
}
export const NotifyType = {
  PRODUCT: "PRODUCT",
  PROVIDER: "PROVIDER",
  CART: "CART",
  ORDER: "ORDER",
};
