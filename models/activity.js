var mongoose = require("mongoose");

var activitySchema = new mongoose.Schema({
    activityName: String,
    activityDescription: String
});

module.exports = mongoose.model("Activity", activitySchema);
