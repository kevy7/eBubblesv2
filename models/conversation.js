var mongoose = require("mongoose");

var conversationSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    timeStamp: Date,
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId, //list of messages within this conversation
            ref: 'Message'
        }
    ],
    conversationName: String
})

module.exports = mongoose.model("Conversation", conversationSchema);