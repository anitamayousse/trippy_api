const express = require("express");
const app = express();
//
app.use(express.json());

app.use(function (req, res, next) {
    console.log("Request received", new Date().toDateString());
    next(); 
  });


// Handle errors
app.get("*", (_req, res) => {
	res.status(404).send("Page not found");
});

// Start the server
app.listen(8000, () => {
	console.log("Listening");
});