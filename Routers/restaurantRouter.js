//------------------ localhost:8000/restaurant/---------------//
const express = require("express");
const router = express.Router();
//Libraries
const Joi = require("Joi");
//Data
const restaurants = require('../RestaurantData');
//schema 

const schema = Joi.object({
	name: Joi.string()
	.required()
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
//-------------------------Routes--------------------------------//

//Route to find the restaurants in a specific criteria (country/city/priceCategory/starts/cuisine/name/address/id)
//Example of url to test in Postman:http://localhost:8000/restaurants?priceCategory=3&country=France&city=Paris
router.get("/", (req, res) => {
	const filters = req.query;
	const filteredRestaurants = restaurants.filter(restaurant => {
		let isValid = true;
		for (key in filters) {
		isValid = isValid && restaurant[key].toString() == filters[key];
		}
		return isValid;
	});

	res.json({
		message:"All the restaurants in your criteria",
		filteredRestaurants});
});

router.get("/:id", (req, res) => {

    const restaurant = restaurants[req.params.id - 1];

	res.json(restaurant);
});
//Route to add a new restaurant 
router.post("/", (req, res) => {
	const restaurant = req.body;
    const validationResult = schema.validate(restaurant);

    if (validationResult.error) {
		return res.status(400).json({
			message: validationResult.error,
		});
	}
	restaurants.push({
        id: restaurants.length + 1,
        restaurant});

	res.json({
		message: "Restaurant added",
		restaurants,
	});
});
//Route to modify a restaurant by id 
router.patch("/:id", (req, res) => {
	const restaurantName = restaurants[req.params.id - 1];

    restaurantName.name = req.body.name 

	res.json({
		message: "Name changed",
		restaurants,
	});
});
//Route to delete a restaurant by id 
router.delete("/:id", (req, res) => {
	const restaurant = restaurants[req.params.id - 1];

    restaurants.splice(restaurants.indexOf(restaurant), 1);

	res.json({
		message: "Restaurant is deleted from the list!",
		restaurants,
	});
});
//Export the router
module.exports = router;
