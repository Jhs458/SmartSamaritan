var mongoose = require('mongoose');

var CommoditiesSchema = new mongoose.Schema({
 currency: Number,
 rating: {rateTotes: Number, sumRates:Number},
 userCom: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},

});

mongoose.model('Commodities', CommoditiesSchema);
