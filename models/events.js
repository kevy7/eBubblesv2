var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
   eventName: String,
   eventImage: String,
   eventDate: Date,
   timestamp: Date,
   eventDescription: String,
   eventParticipant: [
        {
            //List of participants/users going to this particular event
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
       ],
    eventComments: [
            {
                //List of comments that were posted into this event
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comments'
            }
        ],
    createdby: {
        
            //The user that created this event
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
    },
    eventStreetAddress: String,
    eventCity: String,
    eventState: String,
    eventZipCode: String

});

module.exports = mongoose.model("Events", eventSchema);