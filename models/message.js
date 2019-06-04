var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({

    message: String,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    senderName: String,
    timeStamp: Date

})

module.exports = mongoose.model("Message", messageSchema)