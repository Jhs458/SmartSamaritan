var mongoose = require('mongoose');

var JobsSchema = new mongoose.Schema({
 createdDate: Date,
 location: {street: String, city: String, state: String, zip: Number},
 createdBy: String,
 categeory: String, // [{type:String, enum: ['enumVal1','enumVal2']}]
 currency: Number,
 title: String,
 details: String,
 // status: [{type:String, enum: ['pending','inProgress', 'completed']}],
 rating: Number,
 chosenApp: [
   {type: mongoose.Schema.Types.String, ref: 'User'},
   {boolean: false}
 ],
 applicants: [{
  //  { type: String }
  //  {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
   applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   username: { type: mongoose.Schema.Types.String, ref: 'User'},
   created: Date
 }],
 isCompleted: { type: Boolean, default: false }

});

mongoose.model('Jobs', JobsSchema);
