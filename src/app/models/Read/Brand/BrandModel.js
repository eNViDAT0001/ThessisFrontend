class BrandModel {
    constructor(id,user_id,name,image_path)
    {
        this.id = id;
        this.user_id = user_id
        this.name = name
        this.image_path = image_path
        this.created_at = Date.now()
        this.updated_at = Date.now()
        this.delete_at = null
    }
}

export default BrandModel