// Imports
const express = require("express");
const https = require("https");
const mongoose = require("mongoose");
const secret = require("./secret");

// Schemas
const User = require("./schema/User");
const Layout = require("./schema/Layout");

// Express app
const app = express();
const port = 3000;
app.listen(port, () => {
	console.log("Server has started!");
});

// Signup
app.post("/signup", async (req, res) => {
	const json = req.body;

	const new_layout = new Layout({
		name: "My First Layout",
		icon: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fit=scale&fm=pjpg&h=350&w=700",
	});

	const user = new User({
		name: json.name,
		email: json.email,
		layouts: [new_layout._id],
	});
	
	new_layout.owner = user._id;

	await new_layout.save();
	await new_user.save();
});



mongoose.connect(secret.mongourl).then(() => {
	console.log("Connected to MongoDB!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

async function run() {
	

	console.log(new_layout);
	console.log("\n");
	console.log(new_user);
}
