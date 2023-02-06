class ChanelModel{
    user = [{name: null, avatar: null, userID: null}];
    constructor({id,  user}){
        this._id = id;       
        this.user = user;               
    }
}

export default ChanelModel;