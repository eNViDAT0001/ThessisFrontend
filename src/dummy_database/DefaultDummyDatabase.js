import { ProductOptions } from "../models/Product/ProductOptions";
import { ProductSpecificationModel } from "../models/Product/ProductSpecification";
import {OrderItemModel} from '../models/Order/OrderItem'
const DEFAULT_IMAGE_1 =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
const DEFAULT_IMAGE_2 =
  "https://st2.depositphotos.com/1031343/5599/v/950/depositphotos_55990397-stock-illustration-top-product-stamp.jpg";
export const DEFAULT_IMGAGE = {
  DEFAULT_IMAGE_1: DEFAULT_IMAGE_1,
  DEFAULT_IMAGE_2: DEFAULT_IMAGE_2,
};

export const DEFAULT_PRODUCT_OPTION = new ProductOptions({
  id: 0,
  name: "",
  price: 3,
  quantity: 3,
});
export const DEFAULT_PRODUCT_SPECS = new ProductSpecificationModel({
  id: 0,
  property: "",
  detail: "",
});
export const DEFAULT_ORDER_ITEM = new OrderItemModel({
  id: 0,
  productID: 0,
  name: "",
  price: 0,
  quantity: 0,
  discount: 0,
  image: "",
});
