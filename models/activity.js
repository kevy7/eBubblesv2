var mongoose = require("mongoose");

var activitySchema = new mongoose.Schema({
    activityName: String,
    activityDescription: String,
    activityDate: Date
});

module.exports = mongoose.model("Activity", activitySchema);
