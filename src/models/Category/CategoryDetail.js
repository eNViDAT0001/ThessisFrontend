import { MediaModel } from "../Media/Media";
import CategoryModel from "./Category";

export class CategoryDetail extends CategoryModel{
    constructor({id , name, description, image})
    {
        super({id: id,name: name})
        this.description = description;
        this.image = image;
    }

}
export default CategoryDetail;
