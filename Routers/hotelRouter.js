//------------------ localhost:8000/hotels/---------------
const express = require("express");
const router = express.Router();
//Libraries
const Joi = require("Joi");
//Data
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
//-------------------------Routes--------------------------------//

//Route to find the hotel in a specific criteria (country/city/priceCategory/starts/name/address/id/hasPool/hasSpa)
//Example of url to test in Postman:http://localhost:8000/hotels?priceCategory=3&country=France&city=Paris&hasSpa=true&hasPool=true
router.get("/", (req, res) => {
	const filters = req.query;
	const filteredHotels = hotels.filter(hotel => {
		let isValid = true;
		for (key in filters) {
		isValid = isValid && hotel[key].toString() == filters[key];
		}
		return isValid;
	});

	res.json({
		message:"All the hotels in your criteria",
		filteredHotels});
});



router.get("/:id", (req, res) => {

    const hotel = hotels[req.params.id - 1];

	res.json(hotel);
});
//Route to add a new hotel
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
//Route to modify a hotel by id 
router.patch("/:id", (req, res) => {
	const hotelName = hotels[req.params.id - 1];

    hotelName.name = req.body.name 

	res.json({
		message: "Name changed",
		hotels,
	});
});
//Route to delete a hotel by id 
router.delete("/:id", (req, res) => {
	const hotel = hotels[req.params.id - 1];

    hotels.splice(hotels.indexOf(hotel), 1);

	res.json({
		message: "Hotel is deleted from the list!",
		hotels,
	});
});
//Export the router
module.exports = router;