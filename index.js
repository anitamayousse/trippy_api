const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
//Middlewares
app.use(express.json());

app.use(function (req, res, next) {
    console.log("Request received", new Date().toDateString());
    next(); 
  });

app.use(
  rateLimit({
    windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
    max: 5,
    message: "You exceeded 100 requests in 12 hour limit!",
    headers: true,
  })
);

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