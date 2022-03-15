const express = require("express");
const router = express.Router();
const Joi = require("Joi");
// localhost:8000/hotels/
// localhost:8000/hotels/:id

const hotels = require('../HotelData');
//schema 

const schema = Joi.object({
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
    hasSpa: Joi.boolean().required(),
    hasPool: Joi.boolean().required(),
    priceCategory: Joi.number()
	.min(1)
    .max(5)
	.integer()
	.required(),
});
// routes
router.get("/", (req, res) => {
	const filters = req.query;
	const filteredHotels = hotels.filter(hotel => {
		let isValid = true;
		for (key in filters) {
		isValid = isValid && hotel[key] == filters[key];
		}
		return isValid;
	});

//http://localhost:8000/hotels?priceCategory=3&country=France&city=Paris&hasSpa=true&hasPool=true
	res.json({
		message:"All the hotels in your criteria",
		filteredHotels});
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
		message: "Hotel added",
		hotels,
	});
});

router.patch("/:id", (req, res) => {
	const hotelName = hotels[req.params.id - 1];

    hotelName.name = req.body.name 

	res.json({
		message: "Name changed",
		hotels,
	});
});

router.delete("/:id", (req, res) => {
	const hotel = hotels[req.params.id - 1];

    hotels.splice(hotels.indexOf(hotel), 1);

	res.json({
		message: "Hotel is deleted from the list!",
		hotels,
	});
});
// on exporte le router
module.exports = router;