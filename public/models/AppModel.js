var mongoose = require('mongoose');

var ApplicantsSchema = new mongoose.Schema({
 applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 username: { type: mongoose.Schema.Types.String, ref: 'User'},
 created: Date,
 jobId: {type: mongoose.Schema.Types.ObjectId, ref: 'Jobs'}
});

mongoose.model('Applicants', ApplicantsSchema);
