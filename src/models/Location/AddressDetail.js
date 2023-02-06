import AddressModel from "./Address";

export class AddressDetailModel extends AddressModel{
    constructor({id, provinceID, districtID, wardID, userID, name, gender, phone, province, district, ward, street}){
        super({id: id, name: name, district: district, province: province, ward: ward, gender: gender, phone: phone, street: street});
        this.provinceID = provinceID;
        this.districtID = districtID;
        this.wardID = wardID;
        this.userID = userID;
    }
}

