var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    comment: String,
    timestamp: Date,
    commentCreatedBy: 
      {
                    
         //The user that created this comment
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
         
      },
    username: String
});

module.exports = mongoose.model("Comments", commentSchema);