import { DEFAULT_PRODUCT_OPTION, DEFAULT_PRODUCT_SPECS } from "../../dummy_database/ProductDummyDatabase";
import { ProductModel } from "./Product";



export class ProductDetailModel extends ProductModel {
  options = [DEFAULT_PRODUCT_OPTION];
  specification = [DEFAULT_PRODUCT_SPECS] 
  constructor({
    id,
    categoryID,
    name,
    description,
    price,
    options,
    specification,
    discount,
    rating,
    sold,
    media,
  }) {
    super({id: id, name: name, price: price, discount: discount, media: media, rating: rating});
    this.categoryID = categoryID;
    this.description = description;
    this.specification = specification;
    this.options = options;
    this.sold = sold;
  }
}
