class BannerDetailModel {
    constructor(id,title,collection,discount,image,end_time,products)
    {
        this.id = id;
        this.title = title;
        this.collection = collection;
        this.discount = discount;
        this.image = image;
        this.end_time = end_time;
        this.products = products;
    }
    transformToModel(data){
        this.id = data.id;
        this.title = data.title;
        this.collection = data.collection;
        this.discount = data.discount;
        this.image = data.image;
        this.end_time = data.end_time;
        this.products = data.products;
    }
}

export default BannerDetailModel