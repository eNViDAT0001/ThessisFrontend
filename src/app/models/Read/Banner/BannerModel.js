class BannerModel {
    constructor(id, created_at, updated_at, deleted_at, user_id, title, collection, discount,image,endTime)
    {
        this.id = id;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        this.user_id = user_id;
        this.title = title;
        this.collection = collection;
        this.discount = discount;
        this.image = image;
        this.endTime = endTime;
    }
    transformToModel(data){
        this.id = data.id;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.deleted_at = data.deleted_at;
        this.user_id = data.user_id;
        this.title = data.title;
        this.collection = data.collection;
        this.discount = data.discount;
        this.image = data.image;
        this.endTime = data.endTime;

    }
}

export default BannerModel