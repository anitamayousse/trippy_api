
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({

		name: {
			type: String,
			required: true,
			unique: true,
			maxlength: 255,
		},
		address: {
			type: String,
			required: true,
			maxlength: 255,
		},
		city: {
			type: String,
			required: true,
			maxlength: 255,
		},
		country: {
			type: String,
			required: true,
			maxlength: 255,
		},
		stars: {
			type:Number,
			required: true,
			maxlength: 5,
		},
		cuisine: {
			type:String,
			required: true,
			maxlength: 255,
		},
		priceCategory: {
			type:Number,
			required: true,
		},
		lastConnection: Date,
		orders: Number,
	});

const restaurantModel = mongoose.model("restaurantModel", restaurantSchema);

module.exports = restaurantModel;