export class WardModel{
    constructor({id, districtID, provinceID, name, prefix, createTime, updateTime}){
        this.id = id;
        this.districtID = districtID;
        this.provinceID = provinceID;
        this.name = name;
        this.prefix = prefix;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
}
