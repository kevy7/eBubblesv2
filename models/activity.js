var mongoose = require("mongoose");

var activitySchema = new mongoose.Schema({
    activityName: String,
    activityDescription: String,
    activityDate: Date,
    createdby: {
        //The user that created this event
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },  
});

module.exports = mongoose.model("Activity", activitySchema);
