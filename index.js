const express = require("express");
const app = express();
//Middlewares
app.use(express.json());

app.use(function (req, res, next) {
    console.log("Request received", new Date().toDateString());
    next(); 
  });

// routers
const hotelRouter = require("./Routers/hotelRouter");
const restaurantRouter = require("./Routers/restaurantRouter");
app.use("/hotels", hotelRouter);
app.use("/restaurant", restaurantRouter);


// Handle errors
app.get("*", (_req, res) => {
	res.status(404).send("Page not found");
});

// Start the server
app.listen(8000, () => {
	console.log("Listening");
});