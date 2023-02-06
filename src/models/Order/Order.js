export class OrderModel {
  constructor({ id, name, gender, phone, totalCost, paid }) {
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.phone = phone;
    this.totalCost = totalCost;
    this.paid = paid;
  }
}

