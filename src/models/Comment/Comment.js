import { CommentMediaModel } from "../media/CommentMedia";

export class CommentModel {
  media = [new CommentMediaModel({id: 0, src: ""})]
  constructor({
    id,
    productID,
    userID,
    user,
    avatar,
    comment,
    rating,
    media,
    createTime,
    updateTime,
  }) {
    this.id = id;
    this.productID = productID;
    this.userID = userID;
    this.user = user;
    this.avatar = avatar;
    this.comment = comment;
    this.rating = rating;
    this.media = media;
    this.createTime = createTime;
    this.updateTime = updateTime;
  }
}
export default CommentModel;
