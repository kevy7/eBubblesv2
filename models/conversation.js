var mongoose = require("mongoose");

var conversationSchema = new mongoose.Schema({

/*     senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, */
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
    ]

})

module.exports = mongoose.model("Conversation", conversationSchema);