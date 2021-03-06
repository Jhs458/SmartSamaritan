var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
username: {sparse: true, unique: true, type: String, lowercase: true, trim: true},
email: {sparse: true, unique: true, type:String, lowercase: true, trim: true},
photo: String,
facebook: {
		id: String,
		token: String
},
passwordHash: String,
salt: String,
review: String,
experience: {type: Number},
currency:{type:Number},
location: {street: String, city: String, state: String, zip: Number},
jobs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Jobs'}],
messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Messages'}],
computedRating: {type:Number,default:0},
rating: [Number]
});

UserSchema.methods.setPassword = function(password) {
 this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.checkPassword = function(password) {
 var passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
 return (passwordHash === this.passwordHash);
};

UserSchema.methods.createToken = function() {
 return jwt.sign({
   _id: this._id,
   username: this.username,
   location: this.location,
   email: this.email,
	 photo: this.photo,
	 experience: this.experience,
	 currency: this.currency

 }, "SuperSmart"); //Add Passcode here
};

mongoose.model('User', UserSchema);
