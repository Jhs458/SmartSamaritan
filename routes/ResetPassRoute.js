var express = require('express') ;
var router = express.Router() ;
var mongoose = require('mongoose') ;
var User = mongoose.model('User') ;
var jwt = require('express-jwt');
var passport = require('passport') ;
var nodemailer = require('nodemailer') ;
var flash = require('express-flash') ;
var jwt2 = require("jsonwebtoken");

var async = require("async");
var crypto = require('crypto') ;

var auth = jwt({
	userProperty: 'payload',
	secret: 'SuperSmart'
});

router.post('/register', function (req, res) {
	var smtpTransport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "smartsamaritan902@gmail.com",
			pass: "CoderCamps902"
		}
	}) ;
	var rand, mailOptions, host, link ;

	rand = Math.floor((Math.random() * 100) + 54) ;

	// Set created date
	req.body.joined = new Date() ;


	// Bring in request, and add document from schema
	var user = new User(req.body) ;

	// User is not valid until his email is verified.
	user.isValidated = false ;

	user.rand = rand ;

	// run model function, which encrypts password
	user.setPassword(req.body.password) ;

	// save user to collection
	user.save(function(err, result) {
		if(err) console.log(err) ;
		if(err) return res.status(500).send({ err: "Issues with the server" }) ;
		if(!result) return res.status(400).send({ err: "Server unable to understand request. Maybe request malformed." });


		// Nodemailer code
		// rand = Math.floor((Math.random() * 100) + 54) ;
		host = req.get('host') ;
		link = "http://" + req.get('host') + "/api/reset/verify?id=" + rand + "&email=" + user.email;
		mailOptions = {
		to : user.email, // req.query.to,
		subject : "Please confirm your Email account",
		// html : 'Hello, <br> Please Click on the link to verify your email.<br><a href="' + link + '">Click here to verify</a>"'
		html : 'Hello, <br> Please Click on the link to verify your email.<br><a href="' + link + '">Click here to verify</a>'
	};
	smtpTransport.sendMail(mailOptions, function(error, response) {
		if(error) {
			console.log(error) ;
			res.status(500).send("error") ;
		} else {
			console.log("Message sent: " + response.message);
			res.send("sent") ;
		}
	});
		// Complete post
	}) ;


}) ;


router.get('/verify', function(req, res) {
	// Gets rand and email from URL.
	var rand = req.query.id ;
	var email = req.query.email ;


	// Need to find username on db
	// if rand on username document matches rand,
	// set isValidated on document to true

	User.findOne({ email : email }, function(err, user) {
		if(email === user.email) {
			// Now need to set isValidated to true.
			user.isValidated = true ;

			// Getting host from req.
			var host = req.get('host') ;

			var appUrl = "http://" + host ;


			User.update({ _id : user._id }, user)
			.exec(function(err, user) {
				if(err) return res.status(500).send({ err: "error getting user to edit" }) ;
				if(!user) return res.status(400).send({ err: "user profile doesn't exist" }) ;
				res.send('You have been validated. Please login <a href="' + appUrl + '">here</a>') ;
			}) ;
		} else {
			res.send("Cannot verify. Token did not match.") ;
		}
	}) ;
}) ;


router.post('/forgot', function(req, res, next) {
  console.log("made it to /forgot in reset routes");
	var smtpTransport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: "smartsamaritan902@gmail.com",
			pass: "CoderCamps902"
		}
	}) ;
	var rand, mailOptions, host, link ;

	rand = Math.floor((Math.random() * 100) + 54) ;
	console.log(req.body, "req.body");
	username = req.body.username;
	console.log(username, "username");

	// Look for user on db
	User.findOne({ username : username }, function(err, user) {
		if(err) console.log(err) ;
		if(err) return res.status(500).send({ err: "Issues with the server" }) ;
		if(!user) {
			return res.send("Error: No account with that email address.") ;
		}

		var passwordSecret = 'SuperSmart';
		var date = new Date().getTime();
		var fiveMinutesInMilliseconds = 1000 * 600;
		date += fiveMinutesInMilliseconds;
		resetPassToken = jwt2.sign({
		expirationDate: date,
		user: {
		 id: user._id,
		 name: user.username
	 }
 }, passwordSecret);


		host = req.get('host') ;
		link = 'http://' + host + '/#/passreset/' + resetPassToken;

		mailOptions = {
			to: user.email,
			subject: "Password Reset",
			html : 'Please click on the link to reset your password.<a href="' + link + '">Click here to reset</a>'
		};

		smtpTransport.sendMail(mailOptions, function(error, response) {
			if(error) {
				console.log(error) ;
				res.end("error") ;
			} else {
				console.log(response) ;
				res.end("sent") ;
			}
		});
	}) ;
}) ;


router.put('/resetPassword/', function(req, res) {
	console.log("in /resetPassword");
	console.log(req.body, "req.body");
	User.findOne({ _id : req.body.id }, function(err, user) {
		if(err) console.log(err) ;
		if(err) return res.status(500).send({ err: "Issues with the server" }) ;
		if (!user) {
			return res.send("Error: Not found.") ;
		}
		user.setPassword(req.body.password) ;
		User.update({ _id: req.body.id }, user)
		.exec(function(err, user) {
			if(err) ;
			if(!user) ;
			res.send(user) ;
		}) ;
	}) ;
}) ;


module.exports = router;
