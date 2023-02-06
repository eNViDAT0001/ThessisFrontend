import { BannerModel } from "../models/Banner/Banner";

export const BANNER_DUMMY = [
    new BannerModel({
        id: 1,
        title: "Abc",
        discount: 10,
        collection: "Men collections 2020",
        image: "https://innhanhsieuviet.com/wp-content/uploads/2020/03/in-banner-0.jpg",
        endTime: new Date(),
    }),
    new BannerModel({
        id: 2,
        title: "Abc",
        discount: 10,
        collection: "Men collections 2020",
        image: "https://haycafe.vn/wp-content/uploads/2022/03/Background-banner-1.jpg",
        endTime: new Date(),
    }),
    new BannerModel({
        id: 3,
        title: "Abc",
        discount: 10,
        collection: "Men collections 2020",
        image: "https://img6.thuthuatphanmem.vn/uploads/2022/03/16/mau-background-banner-3d_014243588.jpg",
        endTime: new Date(),
    }),
]