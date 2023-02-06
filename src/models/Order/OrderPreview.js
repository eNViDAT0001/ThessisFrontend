import { DEFAULT_ORDER_ITEM } from "../../dummy_database/DefaultDummyDatabase";
import { OrderModel } from "./Order";

export class OrderPreviewModel extends OrderModel{
    item = DEFAULT_ORDER_ITEM;
    constructor({id, userID, name, gender, phone, province, district, ward, street, item, totalCost, payment, paid}){
       super({id: id, userID: userID, name: name, gender: gender, phone: phone, paid: paid, totalCost: totalCost})
        this.province = province;
        this.district = district;
        this.ward = ward;
        this.street = street;
        this.item = item;
        this.payment = payment;
    }
}
