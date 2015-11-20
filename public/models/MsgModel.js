var mongoose = require('mongoose');

var MessagingSchema = new mongoose.Schema({
 body: {required: true, type: String},
 created: Date,
 createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
 sentTo: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
});

mongoose.model('Messages', MessagingSchema);
