// Dependencies
var express = require("express");
var mongojs = require("mongojs");
//Require request and cheerio. this makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

//Initialize Express
var app = express();

//Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

//Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error){
	console.log("Databse Error:", error);	
});

//Main route (simple HelloWorld Message)
app.get("/", function(req, res) {
	res.send("Hello world");
});

// make two more routes
//This route will retrieve all of the data
//from the scraperDat collection as a json(this will be populated
//by the data you scrape using the next route)

//find everthing
app.get("/all", function(req, res) {
	db.scrapedData.find({}, function (err, found) {
		if (err) {
			console.log(err);
		}
		else {
			res.json(found);
		}
	});
});


//Route 2
//when you visit this route, the server will 
//scrape dat from the site of your choice, and save it to 
//MongoDB
//Tip: think back to how you pushed website data
//into an empty array n the last class. How do you 
//push it into a MongoDB colletion instead?

app.listen(3000, function() {
	console.log("App running on port 3000!");
});