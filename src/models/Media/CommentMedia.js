import { MediaModel } from "./Media";

export class CommentMediaModel extends MediaModel{
    constructor({id, src}){
        super({ id: id, src: src });
    }
}
