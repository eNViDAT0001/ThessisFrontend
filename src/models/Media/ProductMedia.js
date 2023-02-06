import { MediaModel } from "./Media";

export class ProductMediaModel extends MediaModel {
  constructor({ id, src, priority }) {
    super({ id: id, src: src });
    this.priority = priority;
  }
}
