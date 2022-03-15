const express = require("express");
const router = express.Router();
const Joi = require("Joi");
// localhost:8000/restaurant/
// localhost:8000/restaurant/:id

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
// routes
router.get("/", (req, res) => {
	const filters = req.query;
	const filteredRestaurants = restaurants.filter(restaurant => {
		let isValid = true;
		for (key in filters) {
		isValid = isValid && restaurant[key].toString() == filters[key];
		}
		return isValid;
	});

//http://localhost:8000/restaurants?priceCategory=3&country=France&city=Paris
	res.json({
		message:"All the restaurants in your criteria",
		filteredRestaurants});
});

router.get("/:id", (req, res) => {

    const restaurant = restaurants[req.params.id - 1];

	res.json(restaurant);
});

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

router.patch("/:id", (req, res) => {
	const restaurantName = restaurants[req.params.id - 1];

    restaurantName.name = req.body.name 

	res.json({
		message: "Name changed",
		restaurants,
	});
});

router.delete("/:id", (req, res) => {
	const restaurant = restaurants[req.params.id - 1];

    restaurants.splice(restaurants.indexOf(restaurant), 1);

	res.json({
		message: "Restaurant is deleted from the list!",
		restaurants,
	});
});
// on exporte le router
module.exports = router;


//?priceCategory=3&&country=France&&city=Paris