import { MediaModel } from "../Media/Media";
import CategoryModel from "./Category";

export class CategoryHeaderBar extends CategoryModel{
    constructor({id, prevCategory, name}){
        super({id: id,name: name})
        this.prevCategory = prevCategory;
    }

}
export default CategoryHeaderBar;
