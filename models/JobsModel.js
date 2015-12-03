var mongoose = require('mongoose');

var JobsSchema = new mongoose.Schema({
 createdDate: Date,
 location: {street: String, city: String, state: String, zip: Number},
 createdBy: String,
 createdByUsername: String,
 createdByImage: String,
 categeory: String, 
 currency: Number,
 title: String,
 details: String,
 rating: Number,
 chosenApp: [
   {type: mongoose.Schema.Types.String, ref: 'User'},
   {boolean: false}
 ],
 applicants: [{
   applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   username: { type: mongoose.Schema.Types.String, ref: 'User'},
   created: Date
 }],
 declinedHandshake: String,
 isCompleted: { type: Boolean, default: false },
 isConfirmed:{type:Boolean, default:false}
});

mongoose.model('Jobs', JobsSchema);
