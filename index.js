// Imports
const express = require("express");
const https = require("https");
const mongoose = require("mongoose");
const secret = require("./secret");
const fs = require('fs');
const path = require('path');

// Schemas
const User = require("./schema/User");
const Layout = require("./schema/Layout");

// Express app
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const sslServer = https.createServer(
	{
		key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
		cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
	},
	app
);

sslServer.listen(port, () => console.log('Secure server 🚀🔑 on port 3443'))

mongoose.connect(secret.mongourl).then(() => {
	console.log("Connected to MongoDB!");
});



const new_layout = new Layout({
	name: "My First Layout",
	icon: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?auto=compress&fit=scale&fm=pjpg&h=350&w=700",
});

const new_user = new User({
	name: "Archer Calder",
	email: "archercalder@gmail.com",
	layouts: [new_layout._id],
});

async function run() {
	await new_layout.save();
	await new_user.save();

	console.log(new_layout);
	console.log("\n");
	console.log(new_user);
}