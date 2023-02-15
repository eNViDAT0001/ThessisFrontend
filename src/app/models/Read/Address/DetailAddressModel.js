class DetailAddressModel {
    constructor(id, user_id, name, gender, phone, province_code, district_code, ward_code,province,district,ward,street)
    {
        this.id = id;
        this.user_id = user_id;
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.province_code = province_code;
        this.district_code = district_code;
        this.ward_code = ward_code;
        this.province = province;
        this.district = district;
        this.ward = ward;
        this.ward = street;
    }
}

export default DetailAddressModel