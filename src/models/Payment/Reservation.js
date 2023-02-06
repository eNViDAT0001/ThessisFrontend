export class ReservationModel{
    constructor({id, optionID, paymentID, quantity, endTime}){
        this.id = id;
        this.optionID = optionID;
        this.paymentID = paymentID;
        this.quantity = quantity;
        this.endTime = endTime;
    }
}