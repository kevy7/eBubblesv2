var mongoose = require("mongoose");

var logsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    connectedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events"
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    },
    type: String, //What type of log will go in here
    log: String, //The log will go in here. i.e. The user created a comment
    timeStamp: Date
});

module.exports = mongoose.model("Logs", logsSchema);