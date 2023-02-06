class AddressModel{
    isSelected = false;
    constructor({id, name, gender, phone, province, district, ward, street}){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.province = province;
        this.district = district;
        this.ward = ward;
        this.street = street;
    }
}
export default AddressModel;
