export class OrderItemModel{
    constructor({id, productID, name, price, quantity, discount, image}){
        this.id = id;
        this.productID = productID;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.discount = discount;
        this.image = image;
    }
    getDiscountPrice = () => this.price - (this.discount / 100).toFixed(2) * this.price;

}

