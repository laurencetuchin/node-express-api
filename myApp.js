var express = require("express");
var app = express();
require("dotenv").config();
var bodyParser = require("body-parser");

console.log("Hello World");

// app.use(__dirname + "/public", express.static());

app.get("/", (req, res) => {
	// res.send("Hello Express");
	res.sendFile((absolutePath = __dirname + "/views/index.html"));
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
	if (process.env.MESSAGE_STYLE === "uppercase") {
		res.json({ message: "HELLO JSON" });
	}
	res.json({ message: "Hello json" });
});

app.get(
	"/user",
	function (req, res, next) {
		req.user = getTheUserSync(); // Hypothetical synchronous operation
		next();
	},
	function (req, res) {
		res.send(req.user);
	}
);

app.get(
	"/now",
	(req, res, next) => {
		res.time = new Date().toString();
		JSON.stringify({ time: res.time });
		next();
	},
	(req, res) => {
		res.send(res.time);
	}
);

app.get("/:word/echo", (req, res) => {
	const { word } = req.params;
	res.json({ echo: word });
});

app.get("/name", (req, res) => {
	var firstName = req.query.first;
	var lastName = req.query.last;
	res.json({
		name: `${firstName} ${lastName}`,
	});
});

app.listen(3000);

module.exports = app;
