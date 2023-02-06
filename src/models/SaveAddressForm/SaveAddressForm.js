export class SaveAddressForm{
    constructor({user_id,name,gender,phone,province_code,district_code,ward_code,street}){
        this.user_id = user_id;
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.province_code = province_code;
        this.district_code = district_code;
        this.ward_code = ward_code;
        this.street = street
    }
}