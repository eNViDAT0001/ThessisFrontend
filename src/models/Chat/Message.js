class MessageModel{
    seen = false;
    constructor({id, chanelID, userID, text, seen, createAt}){
        this.id = id;
        this.chanelID = chanelID;
        this.userID = userID;       
        this.text = text;
        this.seen = seen;
        this.createAt = createAt;
    }
}

export default MessageModel;