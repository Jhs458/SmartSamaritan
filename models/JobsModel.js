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
 chosenApp: {name: String, id: String},
 applicants: [
   {type: mongoose.Schema.Types.ObjectId, ref: 'Applicants'}
   ],

});

mongoose.model('Jobs', JobsSchema);
