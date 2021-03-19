var mongoose = require("mongoose");

var eventSchema = new mongoose.Schema({
   eventName: String,
   eventImage: String,
   eventDate: Date,
   timestamp: Date,
   eventDescription: String,
   eventParticipants: [
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
    eventZipCode: String,
    eventActivities: [
        {
            //List of activities/suggestions in this event
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity'
        }
    ]

    /*
    eventParticipants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    */

});

module.exports = mongoose.model("Events", eventSchema);