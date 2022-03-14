const express = require("express");
const router = express.Router();
const Joi = require("Joi");
// localhost:8000/hotels/
// localhost:8000/hotels/:id

const hotels = require('../HotelData');
//schema 

const schema = Joi.object({
    id: Joi.number()
	.min(1)
	.integer()
	.required(),
	name: Joi.string()
	.required()
	.alphanum()
	.min(4)
	.max(20),
    address: Joi.string()
	.required(),
    city: Joi.string()
	.required()
	.alphanum()
	.min(1)
	.max(20),
    country: Joi.string()
	.required()
	.alphanum()
	.min(1)
	.max(20),
    stars: Joi.number()
	.min(1)
    .max(5)
	.integer()
	.required(),
    cuisine: Joi.string()
	.alphanum()
	.min(1)
	.max(20),
    priceCategory: Joi.number()
	.min(1)
    .max(5)
	.integer()
	.required(),
});
// routes
router.get("/", (req, res) => {

	res.json({
		message:"All the hotels",
		hotels});
});

router.get("/:id", (req, res) => {

    const hotel = hotels[req.params.id - 1];

	res.json(hotel);
});

router.post("/", (req, res) => {
	const hotel = req.body;
    const validationResult = schema.validate(hotel);

    if (validationResult.error) {
		return res.status(400).json({
			message: validationResult.error,
		});
	}
	hotels.push({
        id: hotels.length + 1,
        hotel});

	res.json({
		message: "User added",
		hotels,
	});
});

// on exporte le router
module.exports = router;