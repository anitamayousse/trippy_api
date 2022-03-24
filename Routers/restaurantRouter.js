//------------------ localhost:8000/restaurant/---------------//
const express = require("express");
const mongoose = require("mongoose");
mongoose
	.connect(
		"mongodb+srv://Anita:kzu9AaUTgJWAT4TN@cluster0.wiyzu.mongodb.net/Trippy?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
		}
	)
	.then(() => console.log("Connected to MongoDB"));
const restaurantModel = require("../models/RestaurantDataModel");
//const dotenv = require("dotenv")
//dotenv.config({
	//path: "./config.env",
//});
//const { Pool } = require("pg");
//console.log(Pool);
const app = express();
//const Postgres = new Pool ({ ssl: { rejectUnauthorized: false }});
const router = express.Router();
//Libraries
//const Joi = require("Joi");
//Data
//const restaurants = require('../models/RestaurantDataModel');
//schema 

// const schema = Joi.object({
// 	name: Joi.string()
// 	.required()
// 	.min(4)
// 	.max(20),
//     address: Joi.string()
// 	.required(),
//     city: Joi.string()
// 	.required()
// 	.alphanum()
// 	.min(1)
// 	.max(20),
//     country: Joi.string()
// 	.required()
// 	.alphanum()
// 	.min(1)
// 	.max(20),
//     stars: Joi.number()
// 	.min(1)
//     .max(5)
// 	.integer()
// 	.required(),
//     cuisine: Joi.string()
// 	.alphanum()
// 	.min(1)
// 	.max(20),
//     priceCategory: Joi.number()
// 	.min(1)
//     .max(5)
// 	.integer()
// 	.required(),
// });
//-------------------------Routes--------------------------------//

//Route to find the restaurants in a specific criteria (country/city/priceCategory/starts/cuisine/name/address/id)
//Example of url to test in Postman:http://localhost:8000/restaurants?priceCategory=3&country=France&city=Paris
//-------------------------MongoDB--------------------------------//
//get with MongoDB

router.get("/",async (req, res) => {
	const restaurants = await restaurantModel.find(req.body);
	res.send(restaurants);
});
//get by query
router.get("/query",async (req, res) => {
	const restaurants = await restaurantModel.find(req.query);
	res.send(restaurants);
});
//get by id
router.get("/:id", async (req, res) => {
	const restaurant = await restaurantModel.findById(req.params.id);

	res.json(restaurant);
});
//post to MongoDB
router.post("/", async (req, res) => {
	await restaurantModel.create(req.body);

	res.status(201).json({
		message: "User created",
	});
});

router.patch("/:id", async (req, res) => {
	await restaurantModel.findByIdAndUpdate(req.params.id, {
		name: req.body.name,
		stars:req.body.stars,
	});

	res.json({
		message: "Name and Stars have been upadated",
	});
});

//-------------------------SQL--------------------------------//
//get by key and value with SQL

// router.get("/", async (req, res) => {
// 	const queryKeys = Object.keys(req.query);
// 	const instruction = "SELECT * FROM restaurants";
// 	let instruction2;
// 	if (queryKeys.length > 0) {
// 		instruction2 = `SELECT * FROM restaurants WHERE LOWER(${
// 			queryKeys[0]
// 		})=LOWER('${req.query[queryKeys[0]].toString()}')`;
// 	}

// 	let restaurant;
// 	try {
// 		if (queryKeys.length === 0) {
// 			restaurant = await Postgres.query(instruction);
// 		} else if (queryKeys.length === 1) {
// 			restaurant = await Postgres.query(instruction2);
// 		} else {
// 			for (let i = 1; i < queryKeys.length; i++) {
// 				instruction2 = `${instruction2} AND ${
// 					queryKeys[i]
// 				}='${req.query[queryKeys[i]].toString()}'`;
// 			}
// 			restaurant = await Postgres.query(instruction2);
// 		}
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(400).json({
// 			message: "An error happened",
// 		});
// 	}

// 	res.json(restaurant.rows);
// });

//get by id with SQL 
//  router.get("/:id",async (req, res) => {
//  	let restaurants;
//  	try{
//  	restaurants = await Postgres.query ("SELECT * FROM restaurants WHERE restaurants.id=$1", [req.params.id])
//  	} catch (err)  {
//  		console.error(err);
//  		return res.status(400).json({
//  			message: "Erorr: Please enter a number",
//  		});
//  	}
//  	res.json(restaurants.rows);
// });
//-------------------------NO SQL--------------------------------//
////Route to get by id without SQL 
// router.get("/:id", (req, res) => {

//     const restaurant = restaurants[req.params.id - 1];

// 	res.json(restaurant);
// });
//Route to add a new restaurant 
// router.post("/", (req, res) => {
// 	const restaurant = req.body;
//     const validationResult = schema.validate(restaurant);

//     if (validationResult.error) {
// 		return res.status(400).json({
// 			message: validationResult.error,
// 		});
// 	}
// 	restaurants.push({
//         id: restaurants.length + 1,
//         restaurant});

// 	res.json({
// 		message: "Restaurant added",
// 		restaurants,
// 	});
// });
//Route to modify a restaurant by id 
// router.patch("/:id", (req, res) => {
// 	const restaurantName = restaurants[req.params.id - 1];

//     restaurantName.name = req.body.name 

// 	res.json({
// 		message: "Name changed",
// 		restaurants,
// 	});
// });
//Route to delete a restaurant by id 
// router.delete("/:id", (req, res) => {
// 	const restaurant = restaurants[req.params.id - 1];

//     restaurants.splice(restaurants.indexOf(restaurant), 1);

// 	res.json({
// 		message: "Restaurant is deleted from the list!",
// 		restaurants,
// 	});
// });
//Export the router
module.exports = router;
