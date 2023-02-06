import { DistrictModel } from "../models/Location/District";
import { ProvinceModel } from "../models/Location/Province";
import { WardModel } from "../models/Location/Ward";

export const ListProvince = [
  new ProvinceModel({
    id: 0,
    name: "Cà Mau",
    code: 64,
    createTime: "",
    updateTime: "",
  }),
  new ProvinceModel({
    id: 1,
    name: "Bạc Liêu",
    code: 63,
    createTime: "",
    updateTime: "",
  }),
  new ProvinceModel({
    id: 2,
    name: "Kiên Giang",
    code: 62,
    createTime: "",
    updateTime: "",
  }),
];

export const ListDistrict = [
  new DistrictModel({
    id: 0,
    provinceID: ListProvince[0],
    name: "Huyện trần văn thời",
    prefix: "",
    createTime: "",
    updateTime: "",
  }),
  new DistrictModel({
    id: 1,
    provinceID: ListProvince[0],
    name: "Huyện Thị trấn Sông Đốc",
    prefix: "",
    createTime: "",
    updateTime: "",
  }),
  new DistrictModel({
    id: 2,
    provinceID: ListProvince[1],
    name: "Phường 1 Bạc Liêu",
    prefix: "",
    createTime: "",
    updateTime: "",
  }),
  new DistrictModel({
    id: 3,
    provinceID: ListProvince[1],
    name: "Phường 2 Bạc Liêu",
    prefix: "",
    createTime: "",
    updateTime: "",
  }),
  new DistrictModel({
    id: 4,
    provinceID: ListProvince[2],
    name: "Phường 1 Kiên Giang",
    prefix: "",
    createTime: "",
    updateTime: "",
  }),
  new DistrictModel({
    id: 5,
    provinceID: ListProvince[2],
    name: "Phường 2 Kiên Giang",
    prefix: "",
    createTime: "",
    updateTime: "",
  })
];

export const ListWard = [
  new WardModel({
    id: 0,
    districtID: ListDistrict[0],
    provinceID: ListProvince[0],
    name: "Khóm 1",
    prefix: "",
    createTime: "",
    updateTime: ""
  }),
  new WardModel({
    id: 1,
    districtID: ListDistrict[0],
    provinceID: ListProvince[0],
    name: "Khóm 2",
    prefix: "",
    createTime: "",
    updateTime: ""
  }),
  new WardModel({
    id: 2,
    districtID: ListDistrict[0],
    provinceID: ListProvince[0],
    name: "Khóm 3",
    prefix: "",
    createTime: "",
    updateTime: ""
  }),
  new WardModel({
    id: 3,
    districtID: ListDistrict[1],
    provinceID: ListProvince[0],
    name: "Khóm SĐ 1",
    prefix: "",
    createTime: "",
    updateTime: ""
  }),
  new WardModel({
    id: 4,
    districtID: ListDistrict[1],
    provinceID: ListProvince[0],
    name: "Khóm SĐ 2",
    prefix: "",
    createTime: "",
    updateTime: ""
  }),
];
