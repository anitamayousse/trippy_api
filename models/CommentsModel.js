
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

		username: {
			type: String,
			required: true,
			unique: true,
			maxlength: 255,
		},
		text: {
			type: String,
			required: true,
			maxlength: 500,
		},
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'restaurantModel'},
		lastConnection: Date,
		orders: Number,
	});

const commentsModel = mongoose.model("commentsModel", commentSchema);

module.exports = commentsModel;